"use client";
import { GroupInterface } from "@/types/group.types";
import { useQuery } from "@tanstack/react-query";
import { createContext, useContext, useMemo } from "react";
import { useAuth } from "./user.context";
import Loading from "@/app/loading";
import { toast } from "@/components/ui/use-toast";
import { notFound } from "next/navigation";
import { TransactionInterface } from "@/types/transaction.types";

interface GroupSlugContextType {
  group: GroupInterface | null;
  isPending: boolean;
  error: any;
  getExpenseOfUser: (userId?: string | null) => {
    groupExpense: number;
    personalExpense: number;
    groupContribution: number;
    balance: number;
  };
}

const GroupSlugContext = createContext<GroupSlugContextType>({
  group: null,
  isPending: false,
  error: null,
  getExpenseOfUser: () => ({
    groupExpense: 0,
    personalExpense: 0,
    groupContribution: 0,
    balance: 0,
  }),
});

const fetchGroupBySlug = async (slug: string, token?: string) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/groups/${slug}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  if (!response.ok) {
    throw new Error("Failed to fetch group data");
  }
  return (await response.json()) as GroupInterface;
};

export const GroupSlugProvider = ({
  slug,
  children,
}: {
  slug: string;
  children: React.ReactNode;
}) => {
  const { userDetails } = useAuth();
  const { data, isPending, error } = useQuery({
    queryKey: ["group-slug-data", userDetails?._id],
    queryFn: async () => await fetchGroupBySlug(slug, userDetails?.token),
    enabled: !!slug,
  });
  if (isPending) {
    return <Loading />;
  }
  if (error) {
    return notFound();
  }
  if (!isPending && !data) return notFound();

  const getUserJoinedDate = (userId: string) => {
    const user = data.members.find((m) => m.user._id === userId);
    return user?.createdAt || "";
  };

  const getTransactionsOfUser = (userId?: string | null) => {
    if (!userId) return;
    const transactionsOfUser = data.transactions?.filter(
      (transaction) =>
        (transaction.split || transaction.transactionBy._id === userId) &&
        new Date(getUserJoinedDate(userId)) <=
          new Date(transaction.createdAt) &&
        (transaction.transactionBy._id === userId ||
          !transaction.exclude?.find((t) => t._id === userId))
    );
    return transactionsOfUser ?? [];
  };

  const calculateMembersOfTransaction = (
    transaction?: TransactionInterface | null,
    userId?: string | null
  ) => {
    if (!transaction) return 0;
    let excludedMembers = transaction.exclude?.length || 0;
    let lateJoinedMembers = data.members
      .filter(
        (member) =>
          new Date(member.createdAt) >= new Date(transaction.createdAt)
      )
      .filter((member) => member.user._id !== userId).length ?? 0;
    // console.log(userId, lateJoinedMembers);
    let totalGroupMembers = data.members.length;
    return totalGroupMembers - excludedMembers - lateJoinedMembers;
  };

  const getExpenseOfUser = (userId?: string | null) => {
    let groupExpense = 0;
    let personalExpense = 0;
    let groupContribution = 0;
    let balance = 0;
    if (!userId)
      return {
        groupExpense,
        personalExpense,
        groupContribution,
        balance,
      };
    const transactions = getTransactionsOfUser(userId);
    transactions?.map((transaction) => {
      if (!transaction.split && transaction.transactionBy._id === userId) {
        personalExpense += transaction.amount;
      }
      if (transaction.split && transaction.transactionBy._id === userId) {
        groupContribution += transaction.amount;
      }
      if (transaction.split) {
        groupExpense +=
          transaction.amount /
          calculateMembersOfTransaction(transaction, userId);
      }
    });
    return {
      groupExpense,
      personalExpense,
      groupContribution,
      balance: groupContribution - groupExpense,
    };
  };

  return (
    <GroupSlugContext.Provider
      value={{
        group: data,
        isPending: isPending,
        error: error,
        getExpenseOfUser,
      }}
    >
      {children}
    </GroupSlugContext.Provider>
  );
};

export const useGroupSlug = () => {
  const context = useContext(GroupSlugContext);
  if (!context) {
    throw new Error("useGroupSlug must be used within a GroupSlugProvider");
  }
  return context;
};
