"use client";
import React, { useEffect, useState } from "react";
import TransactionsChart from "@/components/custom-components/dashboard/TransactionsChart";
import ExpenseSummary from "@/components/custom-components/dashboard/ExpenseSummary";
import GroupMembers from "@/components/custom-components/dashboard/GroupMembers";
import GroupMenu from "@/components/custom-components/dashboard/GroupMenu";
import Heading from "@/components/custom-components/dashboard/Heading";
import RecentActivities from "@/components/custom-components/dashboard/RecentActivities";
import { TransactionsTable } from "@/components/custom-components/dashboard/TransactionsTable";
import ContainerSection from "@/components/partials/ContainerSection";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import Image from "next/image";
import { useGroupSlug } from "@/contexts/group-slug.context";
import { calculateNepaliDateAndTime } from "@/lib/date_calculations";
import {
  calculatePersonalExpense,
  calculateTotalExpense,
} from "@/lib/expense_calculations";
import UpdateGroupImage from "@/components/forms/UpdateGroupImage";

const GroupInfo = () => {
  const { group, getExpenseOfUser } = useGroupSlug();
  const groupResult = calculateTotalExpense(group?.transactions || []);
  return (
    <>
      <Heading title={group?.name} />
      <ContainerSection>
        <div className="w-full relative border rounded-lg border-secondary-color">
          <AspectRatio ratio={16 / 9}>
            <Image
              fill
              src={group?.photo || "/images/group.jpg"}
              alt="Image"
              className="rounded-md object-cover"
            />
          </AspectRatio>
          <UpdateGroupImage/>
        </div>
      </ContainerSection>
      <GroupMenu />
      <ContainerSection className="flex flex-col justify-center items-center gap-4 my-10">
        <h3 className="mb-1.5 text-2xl font-semibold text-black dark:text-white">
          {group?.name}
        </h3>
        <p className="font-medium">Created by {group?.owner.displayName}</p>
        <p className="text-sm flex flex-col gap-2 justify-center items-center">
          <span>{calculateNepaliDateAndTime(group?.createdAt).nepaliDate}</span>
          <span>{calculateNepaliDateAndTime(group?.createdAt).time}</span>
        </p>
        <div className="mx-auto mb-5.5 mt-4.5 grid max-w-94 grid-cols-3 rounded-md border border-stroke py-2.5 shadow-1 dark:border-strokedark dark:bg-[#37404F]">
          <div className="flex flex-col items-center justify-center gap-1 border-r border-stroke px-4 dark:border-strokedark xsm:flex-row">
            <span className="font-semibold text-black dark:text-white">
              {new Intl.NumberFormat("en-NP", {
                style: "currency",
                currency: "NPR",
              }).format(groupResult.totalGroupExpense)}
            </span>
            <span className="text-sm">Expense</span>
          </div>
          <div className="flex flex-col items-center justify-center gap-1 border-r border-stroke px-4 dark:border-strokedark xsm:flex-row">
            <span className="font-semibold text-black dark:text-white">
              {groupResult.groupTransactions}(+
              {groupResult.personalTransactions})
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
        <GroupMembers group={group} />
      </ContainerSection>
      <RecentActivities />
      <TransactionsTable />
      <TransactionsChart transactions={group?.transactions || []} />
      <ExpenseSummary />
    </>
  );
};

export default GroupInfo;
