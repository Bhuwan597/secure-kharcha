"use client";
import { useEffect } from "react";
import { toast } from "@/components/ui/use-toast";
import { auth } from "@/config/firebase.config";
import { signOut } from "firebase/auth";
import { useRouter } from "next/navigation";
import { useAuthState } from "react-firebase-hooks/auth";
import Loading from "../loading";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [user, loading, error] = useAuthState(auth);
  const router = useRouter();

  useEffect(() => {
    if (loading) return; // Do nothing while loading
    if (error) {
      toast({
        title: "Error",
        description: error.message,
      });
      signOut(auth);
    } else if (user?.emailVerified) {
      router.replace("/dashboard");
    }
  }, [loading, error, user, router]);

  if (loading) {
    return <Loading />;
  }


  return (
    <>
      {children}
    </>
  );
}
