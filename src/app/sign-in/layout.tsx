"use client";
import { toast } from "@/components/ui/use-toast";
import { auth } from "@/config/firebase.config";
import { signOut } from "firebase/auth";
import { redirect } from "next/navigation";
import { useAuthState } from "react-firebase-hooks/auth";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [user, loading, error] = useAuthState(auth);

  if (loading) {
    return <p className="my-24 text-center">Loading. . . .</p>;
  }
  if (error) {
    toast({
      title: "Error",
      description: error.message,
    });
    signOut(auth);
  }

  if (user) {
    redirect("/dashboard");
  }
  return <>
  {children}
  </>;
}
