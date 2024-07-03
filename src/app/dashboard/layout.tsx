"use client";
import Sidebar from "@/components/custom-components/dashboard/Sidebar";
import { signOut } from "firebase/auth";
import { auth } from "@/config/firebase.config";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/user.context";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { userDetails } = useAuth();
  const router = useRouter();
  console.log(userDetails)
  if (!userDetails) {
    signOut(auth);
    return router.push("/sign-in");
  }

  return (
    <>
      <Sidebar />
      {children}
    </>
  );
}
