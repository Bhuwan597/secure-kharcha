"use client";
import React from "react";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { useForm } from "react-hook-form";
import { z } from "zod";
import GroupSchema from "../../../schemas/group.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import CustomButton from "../custom-components/CustomButton";
import { Save } from "lucide-react";
import { useMutation } from "@tanstack/react-query";
import { useAuth } from "@/contexts/user.context";
import { toast } from "../ui/use-toast";
import { GroupInterface } from "@/types/group.types";

const CreateGroupForm = ({
  refetch,
  setIsDialogOpen,
}: {
  refetch: ()=> void,
  setIsDialogOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const { userDetails } = useAuth();
  const form = useForm<z.infer<typeof GroupSchema>>({
    resolver: zodResolver(GroupSchema),
    defaultValues: {
      name: "",
      description: "",
    },
  });
  const mutation = useMutation({
    mutationFn: async (formData: z.infer<typeof GroupSchema>) => {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/groups`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${userDetails?.token}`,
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (!res.ok) {
        throw Error(data.message as string);
      }

      return data as GroupInterface;
    },
    onSuccess: (data: GroupInterface) => {
      form.reset({
        name: "",
        description: ""
      });
      setIsDialogOpen(false);
      toast({
        title: "Successfull.",
        description: `${data.name} group was created.`,
      });
      return refetch()
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: error.message
      });
    },
  });

  const onSubmit = async (formData: z.infer<typeof GroupSchema>) => {
    mutation.mutate(formData);
  };
  return (
    <>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col gap-2 w-full"
        >
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => {
              return (
                <FormItem>
                  <div className="w-full my-2">
                    <FormLabel htmlFor="name" className="text-right">
                      Group Name
                    </FormLabel>
                    <FormControl>
                      <Input
                        id="name"
                        className="col-span-3"
                        placeholder="E.g Family Vacation"
                        {...field}
                      />
                    </FormControl>
                  </div>
                  <FormMessage />
                </FormItem>
              );
            }}
          />

          <FormField
            control={form.control}
            name="description"
            render={({ field }) => {
              return (
                <FormItem>
                  <div className="w-full my-2">
                    <FormLabel htmlFor="description" className="text-right">
                      Description
                    </FormLabel>
                    <FormControl>
                      <Textarea
                        id="description"
                        className="col-span-3"
                        placeholder="Description of the group"
                        {...field}
                      />
                    </FormControl>
                  </div>
                  <FormMessage />
                </FormItem>
              );
            }}
          />
          <CustomButton
            loading={mutation.isPending}
            type="submit"
            className="bg-secondary-color"
          >
            <Save className="mr-2 h-4 w-4" />
            Save
          </CustomButton>
        </form>
      </Form>
    </>
  );
};

export default CreateGroupForm;
