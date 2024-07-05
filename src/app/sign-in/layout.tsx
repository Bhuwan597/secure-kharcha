"use client";
import { useEffect } from "react";
import { toast } from "@/components/ui/use-toast";
import { auth } from "@/config/firebase.config";
import { signOut } from "firebase/auth";
import { useRouter, useSearchParams } from "next/navigation";
import { useAuthState } from "react-firebase-hooks/auth";
import Loading from "../loading";
import { useAuth } from "@/contexts/user.context";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = decodeURIComponent(searchParams.get("callbackUrl") || "");

  const { userDetails } = useAuth();
  if (userDetails) {
    return router.push(callbackUrl ? callbackUrl : "/dashboard");
  }
  return <>{children}</>;
}
