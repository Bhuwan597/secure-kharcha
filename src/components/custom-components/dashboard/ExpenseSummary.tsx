import ContainerSection from "@/components/partials/ContainerSection";
import { Separator } from "@/components/ui/separator";
import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { GroupInterface, GroupMemberInterface } from "@/types/group.types";
import { calculatePersonalExpense, getJoinedDate } from "@/lib/expense_calculations";
import { UserDetailsInterface } from "@/contexts/user.context";
import { useGroupSlug } from "@/contexts/group-slug.context";

const ExpenseCard = ({
  user,
  balance,
  contribution,
  totalExpense,
  personalExpense
}: {
  user: UserDetailsInterface;
  contribution: number;
  totalExpense: number;
  balance: number;
  personalExpense: number;
}) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{user.displayName}</CardTitle>
        <CardDescription>{user.email}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-row items-center gap-4">
          <span className="font-medium text-lg">Group Contribution</span>
          <span>
            {new Intl.NumberFormat("en-NP", {
              style: "currency",
              currency: "NPR",
            }).format(contribution)}
          </span>
        </div>
        <div className="flex flex-row items-center gap-4">
          <span className="font-medium text-lg">Group Expense</span>
          <span>
            {new Intl.NumberFormat("en-NP", {
              style: "currency",
              currency: "NPR",
            }).format(totalExpense)}
          </span>
        </div>
        <div className="flex flex-row items-center gap-4">
          <span className="font-medium text-lg">Personal Expense</span>
          <span>
            {new Intl.NumberFormat("en-NP", {
              style: "currency",
              currency: "NPR",
            }).format(personalExpense)}
          </span>
        </div>
        <div className={"flex flex-row items-center gap-4"}>
          <span className="font-medium text-lg">Balance</span>
          <span className={balance < 0 ? "text-red-600" : "text-green-600"}>
            {new Intl.NumberFormat("en-NP", {
              style: "currency",
              currency: "NPR",
            }).format(balance)}
          </span>
        </div>
      </CardContent>
    </Card>
  );
};

const ExpenseSummary = () => {
  const {group, getExpenseOfUser} = useGroupSlug()
  if (!group || !group.members) return;
  return (
    <>
      <ContainerSection className="my-10">
        <div className="w-full mt-4">
          <h2 className="text-xl text-left text-secondary-color font-bold">
            Expense Summary
          </h2>
          <Separator className="my-4" />
        </div>
        <div className="flex flex-row gap-4 flex-wrap items-center justify-center sm:justify-start">
          {group.members.map((member : GroupMemberInterface) => {
            const result = getExpenseOfUser(member.user._id)
            return (
              <ExpenseCard
                user={member.user}
                balance={result.balance}
                contribution={result.groupContribution}
                totalExpense={result.groupExpense}
                personalExpense={result.personalExpense}
                key={member.user._id}
              />
            );
          })}
        </div>
      </ContainerSection>
    </>
  );
};

export default ExpenseSummary;
