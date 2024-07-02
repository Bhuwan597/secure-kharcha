"use client";
import React, { useEffect, useState } from "react";
import ExpenseChart from "@/components/custom-components/dashboard/ExpenseChart";
import ExpenseSummary from "@/components/custom-components/dashboard/ExpenseSummary";
import GroupMembers from "@/components/custom-components/dashboard/GroupMembers";
import GroupMenu from "@/components/custom-components/dashboard/GroupMenu";
import Heading from "@/components/custom-components/dashboard/Heading";
import RecentActivities from "@/components/custom-components/dashboard/RecentActivities";
import { TransactionsTable } from "@/components/custom-components/dashboard/TransactionsTable";
import ContainerSection from "@/components/partials/ContainerSection";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CameraIcon } from "lucide-react";
import Image from "next/image";
import { doc, getDoc, query, where } from "firebase/firestore";
import { db } from "@/config/firebase.config";
import { GroupInterface } from "@/types/group.types";
import { useQuery } from "@tanstack/react-query";
import { UserDetailsInterface, useAuth } from "@/contexts/user.context";
import Loading from "@/app/loading";
import { toast } from "@/components/ui/use-toast";
import { notFound } from "next/navigation";
import { useGroupSlug } from "@/contexts/group-slug.context";

const GroupInfo = ({ slug }: { slug: string }) => {
  const { group } = useGroupSlug();

  return (
    <>
      <Heading title={group?.name} />
      <ContainerSection>
        <div className="w-full relative">
          <AspectRatio ratio={16 / 5}>
            <Image
              fill
              src="/images/group.jpg"
              alt="Image"
              className="rounded-md object-cover"
            />
          </AspectRatio>
        </div>
      </ContainerSection>
      <GroupMenu />
      <ContainerSection className="flex flex-col justify-center items-center gap-4 my-10">
        <h3 className="mb-1.5 text-2xl font-semibold text-black dark:text-white">
          {group?.name}
        </h3>
        <p className="font-medium">Created by {group?.owner.displayName}</p>
        <p className="text-sm">{group?.createdAt}</p>
        <div className="mx-auto mb-5.5 mt-4.5 grid max-w-94 grid-cols-3 rounded-md border border-stroke py-2.5 shadow-1 dark:border-strokedark dark:bg-[#37404F]">
          <div className="flex flex-col items-center justify-center gap-1 border-r border-stroke px-4 dark:border-strokedark xsm:flex-row">
            <span className="font-semibold text-black dark:text-white">
              Rs. 25945
            </span>
            <span className="text-sm">Expense</span>
          </div>
          <div className="flex flex-col items-center justify-center gap-1 border-r border-stroke px-4 dark:border-strokedark xsm:flex-row">
            <span className="font-semibold text-black dark:text-white">
              {group?.transactions?.length || 0}
            </span>
            <span className="text-sm">Transactions</span>
          </div>
          <div className="flex flex-col items-center justify-center gap-1 px-4 xsm:flex-row">
            <span className="font-semibold text-black dark:text-white">
              {group?.members.length || 0}
            </span>
            <span className="text-sm">Members</span>
          </div>
        </div>

        <div className="mx-auto w-full text-center">
          <h4 className="font-semibold text-black dark:text-white">
            About the group
          </h4>
          <p className="mt-4.5">{group?.description}</p>
        </div>
        {/* <GroupMembers owner={owner} members={members} /> */}
      </ContainerSection>
      <RecentActivities />
      <TransactionsTable />
      <ExpenseChart />
      <ExpenseSummary />
    </>
  );
};

export default GroupInfo;
