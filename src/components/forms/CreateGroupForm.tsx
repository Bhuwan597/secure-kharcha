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
import { addDoc, collection, getDoc } from "firebase/firestore";
import { db } from "@/config/firebase.config";
import { useGroup } from "@/contexts/group.context";

const CreateGroupForm = ({
  setIsDialogOpen,
}: {
  setIsDialogOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const { userDetails } = useAuth();
  const { refetch } = useGroup();
  const form = useForm<z.infer<typeof GroupSchema>>({
    resolver: zodResolver(GroupSchema),
    defaultValues: {
      name: "",
      description: "",
      coverPhoto: "",
      owner: userDetails?.uid,
      createdAt: Date.now().toLocaleString(),
      token: Math.random().toString(36).substr(2),
    },
  });
  const mutation = useMutation({
    mutationFn: async (formData: z.infer<typeof GroupSchema>) => {
      const docRef = await addDoc(collection(db, "groups"), {
        name: formData.name,
        description: formData.description,
        owner: formData.owner,
        members: [formData.owner],
        token: formData.token,
      });
      if (!docRef) {
        throw new Error("Failed to create group");
      }
      const docSnap = await getDoc(docRef);
      const groupData = {
        uid: docSnap.id,
        ...docSnap.data(),
      } as GroupInterface;
      return groupData;
    },
    onSuccess: (data: GroupInterface) => {
      form.reset({
        name: "",
        coverPhoto: "",
        description: "",
        createdAt: "",
        token: "",
      });
      setIsDialogOpen(false);
      refetch();
      toast({
        title: "Successfull.",
        description: `${data.name} group was created.`,
      });
    },
    onError: (error) => {
      toast({
        title: error.message,
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
