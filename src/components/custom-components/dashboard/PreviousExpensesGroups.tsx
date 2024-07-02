"use client";
import ContainerSection from "@/components/partials/ContainerSection";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { IndianRupee, ScanLine } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import CreateNew from "./CreateNew";
import Loading from "@/app/loading";
import { toast } from "@/components/ui/use-toast";
import { useQuery } from "@tanstack/react-query";
import { useAuth } from "@/contexts/user.context";
import { GroupInterface } from "@/types/group.types";

const PreviousExpensesGroups = () => {
  const { userDetails } = useAuth();
  const { data, isPending, error } = useQuery({
    queryKey: ["expense-groups"],
    queryFn: () =>
      fetch(`${process.env.NEXT_PUBLIC_API_URL}/groups`, {
        headers: { Authorization: `Bearer ${userDetails?.token}` },
      }).then(async (res) => {
        const data = await res.json();
        if (!res.ok) {
          throw Error(data.message as string);
        }
        return data as GroupInterface[];
      }),
  });

  if (isPending) {
    return <Loading />;
  }

  if (error) {
    toast({
      title: "Error",
      description: error.message,
    });
  }

  return (
    <ContainerSection className="flex flex-col gap-6 justify-center items-start">
      <div className="flex flex-row justify-between items-center gap-4 w-full flex-wrap">
        <h2 className="text-lg font-semibold italic">Expenses Groups</h2>
        <CreateNew />
      </div>
      <div className="flex flex-col justify-center items-start gap-4 w-full">
        {data && data.length > 0 ? (
          data.map((group, index) => (
            <Link
              key={index}
              href={`/dashboard/splitter/${group?._id}`}
              className="bg-slate-100 hover:bg-slate-300 dark:bg-slate-900 dark:hover:bg-slate-800 w-full p-2 rounded-lg transition-all ease-in-out duration-200 flex flex-col lg:flex-row justify-between items-center gap-4"
            >
              <div className="flex flex-row justify-center items-center gap-4 flex-wrap">
                <div className="w-[50px] md:w-[75px]">
                  <AspectRatio ratio={1 / 1}>
                    <Image
                      src={"/images/group.jpg"}
                      alt="Image"
                      fill
                      className="rounded-md object-cover"
                    />
                  </AspectRatio>
                </div>

                <h3 className="italic text-clip font-semibold">
                  {group.name}
                  <p className="text-sm font-extralight">{group.description}</p>
                </h3>
              </div>

              <div className="flex flex-row gap-10 items-center justify-center">
                <p className="font-bold text-xl flex flex-row items-center justify-center gap-2">
                  <IndianRupee size={20} className="text-secondary-color" />{" "}
                  {group.transactions?.length || 0}
                </p>
                <p className="flex flex-row items-center justify-center gap-2 text-xl font-bold">
                  <ScanLine size={22} className="text-secondary-color" />{" "}
                  {group.transactions?.length || 0}
                </p>
                <div className="flex -space-x-4 rtl:space-x-reverse">
                  {group.members && (
                    <>
                      <div className="w-10 h-10 border-2 border-white rounded-full dark:border-gray-800">
                        <AspectRatio ratio={1 / 1}>
                          <Image
                            fill
                            className="rounded-full"
                            src="/images/test.jpg"
                            alt=""
                          />
                        </AspectRatio>
                      </div>
                      <div className="w-10 h-10 border-2 border-white rounded-full dark:border-gray-800">
                        <AspectRatio ratio={1 / 1}>
                          <Image
                            fill
                            className="rounded-full"
                            src="/images/test.jpg"
                            alt=""
                          />
                        </AspectRatio>
                      </div>
                      <div className="w-10 h-10 border-2 border-white rounded-full dark:border-gray-800">
                        <AspectRatio ratio={1 / 1}>
                          <Image
                            fill
                            className="rounded-full"
                            src="/images/test.jpg"
                            alt=""
                          />
                        </AspectRatio>
                      </div>
                    </>
                  )}

                  <div className="flex items-center justify-center w-10 h-10 text-xs font-medium text-white bg-gray-700 border-2 border-white rounded-full hover:bg-gray-600 dark:border-gray-800 z-10 cursor-pointer">
                    +{group.members?.length || 0}
                  </div>
                </div>
              </div>
            </Link>
          ))
        ) : (
          <p className="w-full text-xl text-center">No groups yet.</p>
        )}
      </div>
    </ContainerSection>
  );
};

export default PreviousExpensesGroups;
