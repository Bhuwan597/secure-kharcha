"use client";
import React, { useState } from "react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import CustomButton from "../custom-components/CustomButton";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "@/config/firebase.config";
import { toast } from "../ui/use-toast";

const ResetPasswordForm = ({
  setIsDialogOpen,
}: {
  setIsDialogOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const [email, setEmail] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setLoading(true);
    try {
      await sendPasswordResetEmail(auth, email)
        .then((value) => {
          setEmail("");
          setIsDialogOpen(false);
          toast({
            title: "Link sent.",
            description: `Password reset link was sent to ${email}`,
          });
        })
        .catch((error: any) => {
          toast({
            title: "Error Occured!",
            description: error.message,
          });
        });
    } catch (error: any) {
      toast({
        title: "Error Occured!",
        description: error.message,
      });
    } finally {
      setLoading(false);
    }
  };
  return (
    <form onSubmit={handleResetPassword} className="flex flex-col gap-4">
      <div className="flex items-center space-x-2">
        <div className="grid flex-1 gap-2">
          <Label htmlFor="email" className="">
            Email Address
          </Label>
          <Input
            required
            type="email"
            id="email"
            name="email"
            placeholder="example@mail.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
      </div>
      <CustomButton
        loading={loading}
        type="submit"
        className="bg-secondary-color"
      >
        Send link
      </CustomButton>
    </form>
  );
};

export default ResetPasswordForm;
