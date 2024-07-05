"use client";
import CustomButton from "@/components/custom-components/CustomButton";
import ButtonLoader from "@/components/partials/ButtonLoader";
import ContainerSection from "@/components/partials/ContainerSection";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { toast } from "@/components/ui/use-toast";
import { useAuth } from "@/contexts/user.context";
import { calculateNepaliDateAndTime } from "@/lib/date_calculations";
import { GroupInterface } from "@/types/group.types";
import { AvatarImage } from "@radix-ui/react-avatar";
import { useMutation, useQuery } from "@tanstack/react-query";
import Image from "next/image";
import {
  notFound,
  usePathname,
  useRouter,
  useSearchParams,
} from "next/navigation";
import React from "react";

const Page = () => {
  const { userDetails } = useAuth();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();
  const group = searchParams.get("group");
  const token = searchParams.get("token");
  const callbackUrl = encodeURIComponent(
    pathname + "?group=" + group + "&token=" + token
  );
  const mutation = useMutation({
    mutationKey: ["join-group-via-link", userDetails?._id],
    mutationFn: async () => {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/groups/join/${group}`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${userDetails?.token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ token: token }),
        }
      );
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.message as string);
      }

      return data as GroupInterface;
    },
    onSuccess: (data: GroupInterface) => {
      toast({
        title: "Successfull",
        description: `You are now member of ${data.name} group.`,
      });
      return router.push(`/dashboard/splitter/${data._id}`);
    },
    onError: (error) => {
        router.push('/dashboard');
      return toast({
        title: "Error",
        description: error.message,
      });
    },
  });

  const { data, error, isPending } = useQuery({
    queryKey: ["join-group", userDetails?._id],
    queryFn: async () => {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/groups/${group}?token=${token}`,
        {
          headers: {
            Authorization: `Bearer ${userDetails?.token}`,
          },
        }
      );
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.message as string);
      }

      return data as GroupInterface;
    },
    enabled: !!userDetails,
  });

  if (!group || !token) return notFound();
  if (!userDetails) return router.push(`/sign-in?callbackUrl=${callbackUrl}`);
  if ((!isPending && !data) || error) return notFound();
  return (
    <ContainerSection className="min-h-screen py-32 flex flex-col justify-center items-center">
      <Card className="flex flex-col justify-center items-center">
        {isPending ? (
          <ButtonLoader />
        ) : (
          <>
            <CardHeader>
              <CardTitle className="text-center">
                <p>Join {data?.name} group</p>
              </CardTitle>
              <CardDescription className="flex flex-col gap-2 items-center justify-center py-4">
                <Badge variant={"secondary"}>
                  {data.members.length} members
                </Badge>
                <p>Created By: {data.owner?.displayName}</p>
                <p>{calculateNepaliDateAndTime(data.createdAt).nepaliDate}</p>
              </CardDescription>
            </CardHeader>
            <CardContent className=" text-center flex flex-col gap-6 justify-center items-center">
              <div className="w-60 overflow-hidden relative border rounded-lg border-secondary-color">
                <AspectRatio ratio={3 / 2}>
                  <Image
                    fill
                    src={data?.photo || "/images/group.jpg"}
                    alt="Image"
                    className="rounded-md object-cover"
                  />
                </AspectRatio>
              </div>
              <p>
                By joining the group you will be able to share expenses among
                the fellow group members. You can also add the group
                transactions as well as personal transactions.
              </p>
            </CardContent>
            <CardFooter>
              <CustomButton
                loading={mutation.isPending}
                onClick={() => mutation.mutate()}
                className="bg-green-600"
              >
                Join Group
              </CustomButton>
            </CardFooter>
          </>
        )}
      </Card>
    </ContainerSection>
  );
};

export default Page;
