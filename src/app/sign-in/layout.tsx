"use client";
import { useEffect } from "react";
import { toast } from "@/components/ui/use-toast";
import { auth } from "@/config/firebase.config";
import { signOut } from "firebase/auth";
import { useRouter } from "next/navigation";
import { useAuthState } from "react-firebase-hooks/auth";
import Loading from "../loading";
import { useAuth } from "@/contexts/user.context";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();

  const { userDetails } = useAuth();
  if (userDetails) return router.push("/dashboard");
  return <>{children}</>;
}
