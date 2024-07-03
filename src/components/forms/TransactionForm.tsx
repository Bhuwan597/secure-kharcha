"use client";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import React, { useEffect, useState } from "react";
import CustomButton from "../custom-components/CustomButton";
import { Save } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import TransactionFormSchema from "../../../schemas/transaction.schema";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import Rselect, { ActionMeta, MultiValue } from "react-select";
import { toast } from "@/components/ui/use-toast";
import { darkModeStyles, lightModeStyles } from "./ReactSlectOptions";
import { UserDetailsInterface, useAuth } from "@/contexts/user.context";
import { useMutation } from "@tanstack/react-query";
import { TransactionInterface } from "@/types/transaction.types";
import { GroupInterface } from "@/types/group.types";

const TransactionForm = ({
  group,
  setIsDialogOpen,
}: {
  group: GroupInterface | null;
  setIsDialogOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const { userDetails } = useAuth();
  const [isDarkMode, setIsDarkMode] = useState(false);
  const form = useForm<z.infer<typeof TransactionFormSchema>>({
    resolver: zodResolver(TransactionFormSchema),
    defaultValues: {
      group: group?._id,
      split: true,
    },
  });
  const mutation = useMutation({
    mutationFn: async (formData: z.infer<typeof TransactionFormSchema>) => {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/transactions`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${userDetails?.token}`,
          },
          body: JSON.stringify(formData),
        }
      );
      const data = await res.json();
      if (!res.ok) {
        throw Error(data.message as string);
      }

      return data as TransactionInterface;
    },
    onSuccess: (data: TransactionInterface) => {
      form.reset({
        title: "",
        amount: 0,
        exclude: [],
        split: true,
      });
      setIsDialogOpen(false);
      toast({
        title: "Successfull.",
        description: `${data.title} transaction created.`,
      });
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: error.message,
      });
    },
  });

  const options = group?.members
    .filter((m) => m._id !== userDetails?._id)
    .map((member) => {
      return {
        label: member.displayName || "",
        value: member._id || "",
      };
    });

  const onSubmit = async (data: z.infer<typeof TransactionFormSchema>) => {
    mutation.mutate(data);
  };
  useEffect(() => {
    const isDark = document.documentElement.classList.contains("dark");
    setIsDarkMode(isDark);
  }, []);

  if (!group) return;
  const customStyles = isDarkMode ? darkModeStyles : lightModeStyles;
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-4 py-4"
      >
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <div className="flex flex-col justify-start items-start gap-2">
                <FormLabel>Transaction Title</FormLabel>
                <FormControl>
                  <Input placeholder="E.g Bought Snacks" {...field} />
                </FormControl>
              </div>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="amount"
          render={({ field }) => (
            <FormItem>
              <div className="flex flex-col justify-start items-start gap-2">
                <FormLabel>Amount</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    placeholder="E.g 120"
                    {...field}
                    onChange={(e) => field.onChange(Number(e.target.value))}
                  />
                </FormControl>
              </div>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="exclude"
          render={({ field }) => (
            <FormItem>
              <div className="flex flex-col justify-start items-start gap-2">
                <FormLabel>Exclude members</FormLabel>
                <FormControl>
                  <Rselect
                    {...field}
                    options={options}
                    styles={customStyles}
                    isMulti
                    onChange={(
                      newValue: MultiValue<{ label: string; value: string }>,
                      actionMeta: ActionMeta<{ label: string; value: string }>
                    ) => {
                      if (Array.isArray(newValue)) {
                        field.onChange(newValue.map((option) => option.value));
                      } else {
                        field.onChange([]);
                      }
                    }}
                    value={options?.filter(
                      (option) =>
                        field.value && field.value.includes(option.value)
                    )}
                    className="w-full dark:bg-dark-color dark:text-white"
                  />
                </FormControl>
              </div>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="split"
          render={({ field }) => (
            <FormItem>
              <div className="flex flex-row items-center justify-between rounded-lg border p-4">
                <div className="space-y-0.5">
                  <FormLabel className="text-base">
                    Split this transaction
                  </FormLabel>
                </div>
                <Switch
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </div>
              <FormMessage />
            </FormItem>
          )}
        />

        <CustomButton
          loading={mutation.isPending}
          type="submit"
          className="bg-dark-color"
        >
          <Save className="mr-2 h-4 w-4" />
          Save
        </CustomButton>
      </form>
    </Form>
  );
};

export default TransactionForm;
