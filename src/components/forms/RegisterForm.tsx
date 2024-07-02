"use client";
import React from "react";
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
import { auth } from "@/config/firebase.config";
import { useMutation } from "@tanstack/react-query";
import { UserDetailsInterface } from "@/contexts/user.context";

export interface RegistrationApiInterface {
  message: string;
  data: UserDetailsInterface;
}
const RegisterForm = () => {
  const form = useForm<z.infer<typeof RegisterSchema>>({
    resolver: zodResolver(RegisterSchema),
    defaultValues: {
      provider: "password",
    },
  });

  const mutation = useMutation({
    mutationFn: async (formData: z.infer<typeof RegisterSchema>) => {
      await createUserWithEmailAndPassword(
        auth,
        formData.email,
        formData.password
      )
        .then(async ({ user }) => {
          const response = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/users`,
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(formData),
            }
          );
          const data = (await response.json()) as RegistrationApiInterface;
          if (!response.ok) {
            throw new Error(data.message as string);
          }
          await sendEmailVerification(user);
          return data.data;
        })
        .catch((error: any) => {
          toast({
            title: "Error",
            description: error.message,
          });
        });
    },
    onSuccess: (data) => {
      form.reset({
        firstName: "",
        lastName: "",
        email: "",
        eSewa: "",
        password: "",
        confirmPassword: "",
        provider: "",
      });
      toast({
        title: "Registration Successfull",
        description: "Verify your email address to sign in.",
      });
    },
    onError: (error: Error) => {
      toast({ title: error.message });
    },
  });

  const onSubmit = async (formData: z.infer<typeof RegisterSchema>) => {
    mutation.mutate(formData);
  };
  return (
    <Form {...form}>
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
          name="eSewa"
          render={({ field }) => (
            <FormItem>
              <div className="flex flex-col gap-2 justify-start items-start">
                <FormLabel>Esewa Phone Number (with country code)</FormLabel>
                <FormControl>
                  <Input
                    type="tel"
                    placeholder="Your eSewa phone number"
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
          loading={mutation.isPending}
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
