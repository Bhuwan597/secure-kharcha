"use client";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
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
import { Textarea } from "@/components/ui/textarea";
import Rselect, { ActionMeta, MultiValue } from "react-select";
import { toast } from "@/components/ui/use-toast";
import { darkModeStyles, lightModeStyles } from "./ReactSlectOptions";
import { UserDetailsInterface } from "@/contexts/user.context";

const options = [
  { value: "apple", label: "Apple" },
  { value: "banana", label: "Banana" },
  { value: "orange", label: "Orange" },
  { value: "grape", label: "Grape" },
  { value: "mango", label: "Mango" },
];

const TransactionForm = ({owner, members}: {owner: UserDetailsInterface, members: UserDetailsInterface[]}) => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [loading, setLoading] = useState<boolean>(false);
  const form = useForm<z.infer<typeof TransactionFormSchema>>({
    resolver: zodResolver(TransactionFormSchema),
    defaultValues: {
      split: true,
    },
  });

  const onSubmit = async (data: z.infer<typeof TransactionFormSchema>) => {
    setLoading(true);
    try {
    } catch (error: any) {
      return toast({
        title: "Error",
        description: error.message,
      });
    }
  };
  useEffect(() => {
    const isDark = document.documentElement.classList.contains("dark");
    setIsDarkMode(isDark);
  }, []);

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
          name="description"
          render={({ field }) => (
            <FormItem>
              <div className="flex flex-col justify-start items-start gap-2">
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Textarea placeholder="Transaction description" {...field} />
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
                    value={options.filter(
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

        <CustomButton type="submit" className="bg-dark-color">
          <Save className="mr-2 h-4 w-4" />
          Save
        </CustomButton>
      </form>
    </Form>
  );
};

export default TransactionForm;
