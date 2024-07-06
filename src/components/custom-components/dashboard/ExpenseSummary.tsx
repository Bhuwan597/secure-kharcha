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
import {
  calculatePersonalExpense,
  getJoinedDate,
} from "@/lib/expense_calculations";
import { UserDetailsInterface, useAuth } from "@/contexts/user.context";
import { useGroupSlug } from "@/contexts/group-slug.context";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { TransactionInterface } from "@/types/transaction.types";
import { calculateNepaliDateAndTime } from "@/lib/date_calculations";
import { ScrollArea } from "@/components/ui/scroll-area";

const ExpenseCard = ({
  currentUser,
  user,
  balance,
  contribution,
  totalExpense,
  personalExpense,
  getTransactionsOfUser,
  calculateMembersOfTransaction,
}: {
  user: UserDetailsInterface;
  currentUser: UserDetailsInterface;
  contribution: number;
  totalExpense: number;
  balance: number;
  personalExpense: number;
  getTransactionsOfUser: (userId?: string | null) => TransactionInterface[];
  calculateMembersOfTransaction: (
    transaction?: TransactionInterface | null,
    userId?: string | null
  ) => number;
}) => {
  const transactions = getTransactionsOfUser(user._id);
  return (
    <Card>
      <CardHeader>
        <Dialog>
          <DialogTrigger>
            <CardTitle>{user.displayName}</CardTitle>
            <CardDescription>{user.email}</CardDescription>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{user.displayName} Expense Details</DialogTitle>
              <DialogDescription className="py-4">
                <ScrollArea className="w-full mb-10 h-72">
                  {transactions && transactions.length > 0 ? (
                    transactions.map((transaction, index) => {
                      return (
                        <>
                          <div
                            key={transaction._id}
                            className="grid grid-cols-3 place-items-start"
                          >
                            <p className="text-primary-color text-base font-bold">
                              {index + 1}. {transaction.title}{" "}
                            </p>
                            <p>
                              {
                                calculateNepaliDateAndTime(
                                  transaction.createdAt
                                ).nepaliDate
                              }
                            </p>
                            <p className="text-secondary-color font-bold w-full text-end">
                              {new Intl.NumberFormat("en-NP", {
                                style: "currency",
                                currency: "NPR",
                              }).format(
                                transaction.amount /
                                  calculateMembersOfTransaction(
                                    transaction,
                                    user._id
                                  )
                              )}
                            </p>
                          </div>
                          <p className="my-2 text-left">
                            Paid by{" "}
                            <span className="italic font-semibold">
                              {transaction.transactionBy._id === currentUser._id
                                ? "me"
                                : transaction.transactionBy.displayName}
                            </span>
                          </p>
                          <Separator className="my-2" />
                        </>
                      );
                    })
                  ) : (
                    <p className="text-center my-10">No Expenses till now.</p>
                  )}
                </ScrollArea>
              </DialogDescription>
            </DialogHeader>
          </DialogContent>
        </Dialog>
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
  const {
    group,
    getExpenseOfUser,
    getTransactionsOfUser,
    calculateMembersOfTransaction,
  } = useGroupSlug();
  const { userDetails } = useAuth();
  if (!group || !group.members || !userDetails) return;
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
          {group.members.map((member: GroupMemberInterface) => {
            const result = getExpenseOfUser(member.user._id);
            return (
              <ExpenseCard
                currentUser={userDetails}
                user={member.user}
                balance={result.balance}
                contribution={result.groupContribution}
                totalExpense={result.groupExpense}
                personalExpense={result.personalExpense}
                key={member.user._id}
                getTransactionsOfUser={getTransactionsOfUser}
                calculateMembersOfTransaction={calculateMembersOfTransaction}
              />
            );
          })}
        </div>
      </ContainerSection>
    </>
  );
};

export default ExpenseSummary;
