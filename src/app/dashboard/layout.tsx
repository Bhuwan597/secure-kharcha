"use client";
import Sidebar from "@/components/custom-components/dashboard/Sidebar";
import { useAuthState } from "react-firebase-hooks/auth";
import Loading from "../loading";
import { toast } from "@/components/ui/use-toast";
import { signOut } from "firebase/auth";
import { auth } from "@/config/firebase.config";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

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
    } else if (!user) {
      router.push("/sign-in");
    }
  }, [loading, error, user, router]);

  if (loading) {
    return <Loading />;
  }

  return (
    <>
      <Sidebar />
      {user && children}
    </>
  );
}
