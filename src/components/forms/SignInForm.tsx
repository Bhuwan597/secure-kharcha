"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useForm } from "react-hook-form";
import SignInSchema from "../../../schemas/signin.schema";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import CustomButton from "../custom-components/CustomButton";
import { Separator } from "../ui/separator";
import Image from "next/image";
import { GoogleAuthProvider, User, signInWithPopup } from "firebase/auth";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import RegisterForm from "./RegisterForm";
import { toast } from "../ui/use-toast";
import { auth } from "@/config/firebase.config";
import { useAuthState } from 'react-firebase-hooks/auth';

const SignInForm = () => {
  const form = useForm<z.infer<typeof SignInSchema>>({
    resolver: zodResolver(SignInSchema),
  });

  const onSubmit = (data: z.infer<typeof SignInSchema>) => {
    console.log(data.email, data.password);
  };

  const googleLogin = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const res = signInWithPopup(auth, provider);
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
      });
    }
  };
  return (
    <div className="flex flex-col items-center justify-center">
      <div className="w-full max-w-sm md:max-w-md lg:max-w-lg px-8 py-4 shadow-md rounded-md flex flex-col">
        <Tabs defaultValue="signin" className="w-full flex flex-col">
          <TabsList>
            <TabsTrigger value="signin">Sign in</TabsTrigger>
            <TabsTrigger value="register">Register</TabsTrigger>
          </TabsList>
          <TabsContent value="signin">
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="flex flex-col gap-4 py-4"
              >
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

                <CustomButton
                  className="w-full bg-secondary-color"
                  type="submit"
                >
                  Sign in
                </CustomButton>
              </form>
            </Form>
          </TabsContent>
          <TabsContent value="register">
            <RegisterForm />
          </TabsContent>
        </Tabs>
        <Separator className="my-2" />
        <div className="flex flex-col gap-2">
          <CustomButton
            onClick={googleLogin}
            type="button"
            className="text-dark-color hover:text-light-color bg-slate-100 flex flex-row justify-center items-center gap-2"
          >
            <Image
              src={"/svgs/google.svg"}
              width={20}
              height={20}
              alt="google icon"
            />
            Continue with Google
          </CustomButton>
        </div>
      </div>
    </div>
  );
};

export default SignInForm;
