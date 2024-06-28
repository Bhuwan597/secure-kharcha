"use client";
import React, { useState } from "react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import RegisterSchema from "../../../schemas/register.schema";
import { Input } from "../ui/input";
import CustomButton from "../custom-components/CustomButton";
import { z } from "zod";
import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
} from "firebase/auth";
import { toast } from "../ui/use-toast";
import { auth, db } from "@/config/firebase.config";
import { doc, setDoc } from "firebase/firestore";
import { Alert, AlertDescription, AlertTitle } from "../ui/alert";
import { Info } from "lucide-react";

const RegisterForm = () => {
  const form = useForm<z.infer<typeof RegisterSchema>>({
    resolver: zodResolver(RegisterSchema),
  });
  const [registerLoading, setRegisterLoading] = useState(false);
  const [verifyEmail, setVerifyEmail] = useState(false);
  const onSubmit = async(data: z.infer<typeof RegisterSchema>) => {
    setRegisterLoading(true);
    try {
      await createUserWithEmailAndPassword(auth, data.email, data.password).then(
        async ({ user }) => {
          const userData = {
            uid: user.uid,
            firstName: data.firstName,
            lastName: data.lastName,
            displayName: data.firstName + " " + data.lastName,
            phoneNumber: data.phoneNumber,
            email: user.email,
            provider: user.providerData[0].providerId,
            photo: user.photoURL,
          };
          await setDoc(doc(db, "users", userData.uid), userData)
            .then((result) => {
              form.reset({
                firstName: "",
                lastName: "",
                email: "",
                phoneNumber: "",
                password: "",
                confirmPassword: "",
              });
              toast({
                title: "Registration Successfull.",
              });
            })
            .catch(() => {
              toast({
                title: "Error while registration. ",
              });
            });

          await sendEmailVerification(user)
            .then(() => {
              setVerifyEmail(true);
            })
            .catch(() => {
              toast({
                title: "Error!",
                description: "verification email was not sent.",
              });
            });
        }
      );
    } catch (error: any) {
      toast({
        title: "Error!",
        description: error.message,
      });
    } finally {
      setRegisterLoading(false);
    }
  };
  return (
    <Form {...form}>
      {verifyEmail && (
        <Alert className="bg-yellow-200">
          <Info size={20} />
          <AlertTitle>Verification!</AlertTitle>
          <AlertDescription>
            Please, verify your email address.
          </AlertDescription>
        </Alert>
      )}

      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-4 py-4"
      >
        <FormField
          control={form.control}
          name="firstName"
          render={({ field }) => (
            <FormItem>
              <div className="flex flex-col gap-2 justify-start items-start">
                <FormLabel>First Name</FormLabel>
                <FormControl>
                  <Input placeholder="Your first name" {...field} />
                </FormControl>
              </div>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="lastName"
          render={({ field }) => (
            <FormItem>
              <div className="flex flex-col gap-2 justify-start items-start">
                <FormLabel>Last Name</FormLabel>
                <FormControl>
                  <Input placeholder="Your last name" {...field} />
                </FormControl>
              </div>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="phoneNumber"
          render={({ field }) => (
            <FormItem>
              <div className="flex flex-col gap-2 justify-start items-start">
                <FormLabel>Phone Number (with country code)</FormLabel>
                <FormControl>
                  <Input
                    type="tel"
                    placeholder="Your phone number"
                    {...field}
                  />
                </FormControl>
              </div>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <div className="flex flex-col gap-2 justify-start items-start">
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder="Your email" {...field} />
                </FormControl>
              </div>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <div className="flex flex-col gap-2 justify-start items-start">
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input
                    type="password"
                    placeholder="Your password"
                    {...field}
                  />
                </FormControl>
              </div>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="confirmPassword"
          render={({ field }) => (
            <FormItem>
              <div className="flex flex-col gap-2 justify-start items-start">
                <FormLabel>Confirm Password</FormLabel>
                <FormControl>
                  <Input
                    type="password"
                    placeholder="Your password"
                    {...field}
                  />
                </FormControl>
              </div>
              <FormMessage />
            </FormItem>
          )}
        />

        <CustomButton
          loading={registerLoading}
          className="w-full bg-secondary-color"
          type="submit"
        >
          Register
        </CustomButton>
      </form>
    </Form>
  );
};

export default RegisterForm;
