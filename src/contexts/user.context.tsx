"use client";
import Loading from "@/app/loading";
import { toast } from "@/components/ui/use-toast";
import { auth } from "@/config/firebase.config";
import { useQuery } from "@tanstack/react-query";
import { signOut } from "firebase/auth";
import React, {
  createContext,
  useContext,
  useState,
  useMemo,
  useCallback,
  useEffect,
} from "react";
import { useAuthState } from "react-firebase-hooks/auth";

const AuthContext = createContext<{ userDetails: UserDetailsInterface | null }>(
  { userDetails: null }
);

export interface UserDetailsInterface {
  _id?: string;
  firstName?: string;
  lastName?: string;
  displayName?: string;
  email?: string;
  eSewa?: string;
  photo?: string;
  provider?: string;
  token?: string;
  createdAt?: string;
  updatedAt?: string;
  emailVerified: boolean;
}

export const AuthContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [user, loading, authError] = useAuthState(auth);
  const [userDetails, setUserDetails] = useState<UserDetailsInterface | null>(
    null
  );
  const contextValue = useMemo(() => ({ userDetails }), [userDetails]);

  const fetchUser = useCallback(async () => {
    if (!user) return null;
    const token = await user.getIdToken(true);
    if (!token) return null;

    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(errorData.message);
    }

    const data = await res.json();
    setUserDetails({
      ...data,
      token: token,
    });

    return data;
  }, [user]);

  const {
    data,
    isLoading,
    error: fetchError,
  } = useQuery({
    queryKey: ["user-details"],
    queryFn: fetchUser,
    enabled: !!user,
  });

  useEffect(() => {
    if (!user) {
      setUserDetails(null);
    }
  }, [user]);

  const isAuthenticating = isLoading || loading;

  // Move conditional rendering logic outside the hook calls
  if (isAuthenticating) {
    return <Loading />;
  }

  if (authError || fetchError) {
    toast({
      title: "Authentication error.",
      description: authError?.message || fetchError?.message,
    });
    signOut(auth);
    return null;
  }

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
