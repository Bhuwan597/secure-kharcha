import { GroupInterface } from "@/types/group.types";
import React from "react";
import CustomButton from "../custom-components/CustomButton";
import { Save } from "lucide-react";
import { Textarea } from "../ui/textarea";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import GroupSchema from "../../../schemas/group.schema";
import { z } from "zod";
import { useMutation } from "@tanstack/react-query";
import { useAuth } from "@/contexts/user.context";
import { toast } from "../ui/use-toast";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { useGroupSlug } from "@/contexts/group-slug.context";

const UpdateGroupInfoForm = ({
  setIsDialogOpen,
}: {
  setIsDialogOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const { userDetails } = useAuth();
  const {group, refetch} = useGroupSlug();
  const form = useForm<z.infer<typeof GroupSchema>>({
    resolver: zodResolver(GroupSchema),
    defaultValues: {
      name: group?.name || "",
      description: group?.description || "",
    },
  });

  const mutation = useMutation({
    mutationFn: async (formData: z.infer<typeof GroupSchema>) => {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/groups/${group?._id}`,
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
      return data as GroupInterface;
    },
    onSuccess: (data: GroupInterface) => {
      form.reset({
        name: "",
        description: "",
      });
      setIsDialogOpen(false);
      toast({
        title: "Successfully Updated",
        description: `${data.name} group has been updated.`,
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

  const onSubmit = async (formData: z.infer<typeof GroupSchema>) => {
    mutation.mutate(formData);
  };

  if (!group) return null;
  return (
    <>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col gap-4 p-4"
        >
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => {
              return (
                <FormItem>
                  <div className="w-full">
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
                  <div className="w-full">
                    <FormLabel htmlFor="description" className="text-right">
                      Group Description
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
          <CustomButton type="submit" className="bg-secondary-color">
            <Save className="mr-2 h-4 w-4" />
            Save
          </CustomButton>
        </form>
      </Form>
    </>
  );
};

export default UpdateGroupInfoForm;
