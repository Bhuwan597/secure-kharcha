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

  const fetchUser = async () => {
    if (!user) return null;
    const token = await user.getIdToken(true);
    if (!token) return null;
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) {
        throw new Error("User data fetch failed.");
      }

      const data = await res.json();
      return { ...data, token };
    } catch (error) {
      throw new Error("User data not found.");
    }
  };

  const { data, isFetching, error: fetchError } = useQuery({
    queryKey: ["user-details", user?.uid],
    queryFn: fetchUser,
    enabled: !!user,
  });
  useEffect(() => {
    if (data) {
      setUserDetails(data);
    }
  }, [data]);

  useEffect(() => {
    if (fetchError) {
      toast({
        title: "Authentication error.",
        description: fetchError.message,
      });
      signOut(auth);
    }
  }, [fetchError]);

  if (loading || isFetching) {
    return <Loading />;
  }

  if (authError) {
    toast({
      title: "Authentication error.",
      description: authError.message,
    });
    signOut(auth);
    return null;
  }

  return (
    <AuthContext.Provider value={{ userDetails }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
