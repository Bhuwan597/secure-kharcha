"use client";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import React, { useEffect, useState } from "react";
import CustomButton from "../custom-components/CustomButton";
import { Save, SaveIcon, Trash2Icon } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import UpdateTransactionFormSchema from "../../../schemas/transaction.schema";
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
import { useAuth } from "@/contexts/user.context";
import { useMutation } from "@tanstack/react-query";
import { TransactionInterface } from "@/types/transaction.types";
import { useGroupSlug } from "@/contexts/group-slug.context";
import { ConfirmAction } from "../partials/ConfirmAction";

const UpdateTransactionForm = ({
  transaction,
  setIsDialogOpen,
}: {
  transaction: TransactionInterface | null;
  setIsDialogOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const { userDetails } = useAuth();
  const { group, refetch } = useGroupSlug();
  const [dialogOpen, setDialogOpen] = useState<boolean>(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const form = useForm<z.infer<typeof UpdateTransactionFormSchema>>({
    resolver: zodResolver(UpdateTransactionFormSchema),
    defaultValues: {
      group: group?._id,
      split: true,
      title: transaction?.title,
      amount: transaction?.amount,
      exclude: transaction?.exclude?.map((u) => u._id),
    },
  });
  const mutation = useMutation({
    mutationFn: async (
      formData: z.infer<typeof UpdateTransactionFormSchema>
    ) => {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/transactions/${transaction?._id}`,
        {
          method: "PUT",
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
      setIsDialogOpen(false);
      toast({
        title: "Successfull.",
        description: `${data.title} transaction updated.`,
      });
      return refetch();
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: error.message,
      });
    },
  });

  const deleteMutation = useMutation({
    mutationKey: ["delete-transaction", transaction?._id],
    mutationFn: async (transactionId: string) => {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/transactions/${transactionId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${userDetails?.token}`,
          },
        }
      );
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.message as string);
      }
      return data as TransactionInterface;
    },
    onSuccess: (data: TransactionInterface) => {
      setIsDialogOpen(false);
      toast({
        title: "Successfull",
        description: `${data.title} transaction is deleted.`,
      });
      return refetch();
    },
    onError: (error) => toast({ title: error.message }),
  });

  const options = group?.members
    .filter((m) => transaction?.transactionBy._id !== m.user._id)
    .map((member) => {
      return {
        label: member.user.displayName || "",
        value: member.user._id || "",
      };
    });

  const onSubmit = async (
    data: z.infer<typeof UpdateTransactionFormSchema>
  ) => {
    mutation.mutate(data);
  };

  useEffect(() => {
    const isDark = document.documentElement.classList.contains("dark");
    setIsDarkMode(isDark);
  }, []);

  if (!group || !transaction) return;
  const customStyles = isDarkMode ? darkModeStyles : lightModeStyles;
  if (
    transaction.transactionBy._id === userDetails?._id ||
    group.owner._id === userDetails?._id
  ) {
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
                    <Input
                      placeholder="E.g Bought Snacks"
                      {...field}
                      value={field.value}
                    />
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
                      value={field.value}
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

          {form.getValues("split") && (
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
                          newValue: MultiValue<{
                            label: string;
                            value: string;
                          }>,
                          actionMeta: ActionMeta<{
                            label: string;
                            value: string;
                          }>
                        ) => {
                          if (Array.isArray(newValue)) {
                            field.onChange(
                              newValue.map((option) => option.value)
                            );
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
          )}

          <CustomButton
            loading={mutation.isPending}
            type="submit"
            className="bg-dark-color"
          >
            <SaveIcon className="mr-2 h-4 w-4" />
            Update
          </CustomButton>
          <CustomButton
            onClick={() => setDialogOpen(true)}
            type="button"
            className="bg-red-600"
          >
            <Trash2Icon className="mr-2 h-4 w-4" />
            Delete
          </CustomButton>
        </form>
        <ConfirmAction
          continueFunction={() =>
           deleteMutation.mutate(transaction._id)
          }
          loading={deleteMutation.isPending}
          setIsOpen={setDialogOpen}
          isOpen={dialogOpen}
        />
      </Form>
    );
  } else {
    return <div className="text-center">You cannot edit this transaction.</div>;
  }
};

export default UpdateTransactionForm;
