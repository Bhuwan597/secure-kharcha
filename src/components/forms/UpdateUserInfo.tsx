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
import { Input } from "../ui/input";
import CustomButton from "../custom-components/CustomButton";
import { z } from "zod";
import { toast } from "../ui/use-toast";
import { useMutation } from "@tanstack/react-query";
import { UserDetailsInterface, useAuth } from "@/contexts/user.context";
import { Check, Timer } from "lucide-react";
import UserSchema from "../../../schemas/user.schema";
import ContainerSection from "../partials/ContainerSection";
import Heading from "../custom-components/dashboard/Heading";
import { calculateNepaliDateAndTime } from "@/lib/date_calculations";

const UpdateInfoForm = () => {
  const { userDetails } = useAuth();
  const form = useForm<z.infer<typeof UserSchema>>({
    resolver: zodResolver(UserSchema),
    defaultValues: {
      firstName: userDetails?.firstName,
      lastName: userDetails?.lastName,
      email: userDetails?.email,
      eSewa: userDetails?.eSewa,
    },
  });

  const mutation = useMutation({
    mutationFn: async (formData: z.infer<typeof UserSchema>) => {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userDetails?.token}`,
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message as string);
      return data as UserDetailsInterface;
    },
    onSuccess: (data: UserDetailsInterface) => {
      toast({
        title: "Successfull",
        description: "Your profile has been updated.",
      });
    },
    onError: (error: Error) => {
      toast({ title: error.message });
    },
  });

  const onSubmit = async (formData: z.infer<typeof UserSchema>) => {
    mutation.mutate(formData);
  };
  if (!userDetails) return;
  const result = calculateNepaliDateAndTime(userDetails.createdAt);
  return (
    <>
      <Heading title={`Profile - ${userDetails.displayName}`} />
      <ContainerSection>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col gap-4"
          >
            <p>
              Account Creation: {result.nepaliDate} ({result.time})
            </p>
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
                    <FormLabel>
                      Esewa Phone Number (with country code)
                    </FormLabel>
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
                    <FormLabel className="flex flex-row gap-2 items-center">
                      <span>Email</span>
                      {userDetails.emailVerified ? (
                        <Check className="text-green-600" />
                      ) : (
                        <Timer className="text-yellow-400" />
                      )}{" "}
                    </FormLabel>
                    <FormControl>
                      <Input
                        disabled
                        readOnly
                        placeholder="Your email"
                        {...field}
                      />
                    </FormControl>
                  </div>
                  <FormMessage />
                  <p>
                    Joined through{" "}
                    <span className="italic font-bold">
                      {userDetails.provider === "password" ? "Email" : "Google"}
                    </span>
                  </p>
                </FormItem>
              )}
            />

            <CustomButton
              loading={mutation.isPending}
              className="w-full bg-secondary-color"
              type="submit"
            >
              Update profile
            </CustomButton>
          </form>
        </Form>
      </ContainerSection>
    </>
  );
};

export default UpdateInfoForm;
