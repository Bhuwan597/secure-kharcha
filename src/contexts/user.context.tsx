"use client";
import Loading from "@/app/loading";
import { toast } from "@/components/ui/use-toast";
import { auth, db } from "@/config/firebase.config";
import { signOut } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import React, { createContext, useContext, useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";

const AuthContext = createContext<{ userDetails: UserDetailsInterface | null }>(
  { userDetails: null }
);

export interface UserDetailsInterface {
  uid?: string;
  firstName?: string;
  lastName?: string;
  displayName?: string;
  email?: string;
  phoneNumber?: string;
  photo?: string;
  provider?: string;
}

export const AuthContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [user, loading, error] = useAuthState(auth);
  const [userDetails, setUserDetails] = useState<UserDetailsInterface | null>(
    null
  );

  useEffect(() => {
    const fetchUserData = async () => {
      if (!user || loading) return;

      try {
        const uid = user.uid;
        const userDocRef = doc(db, "users", uid);
        const userDocSnap = await getDoc(userDocRef);

        if (!userDocSnap.exists()) {
          toast({
            title: "No user found.",
          });
          signOut(auth);
          return;
        }

        const userData = userDocSnap.data() as UserDetailsInterface;
        setUserDetails(userData);
      } catch (error) {
        console.error("Error fetching user data:", error);
        // Handle error fetching user data
      }
    };

    fetchUserData();
  }, [user, loading]);

  if (loading) {
    // Loading state while Firebase auth is initializing
    return <Loading />;
  }

  if (error) {
    toast({
      title: "Authentication error.",
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
