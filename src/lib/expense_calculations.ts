import { GroupInterface, GroupMemberInterface } from "@/types/group.types";
import { TransactionInterface } from "@/types/transaction.types";

export const getJoinedDate = (
  group?: GroupInterface | null,
  userId?: string
) => {
  if (!group || !userId) return Date.now().toString();

  let joinedAt = "";
  group.members.map((member) => {
    if (member.user._id === userId) {
      joinedAt = member.createdAt;
      return;
    }
  });

  return joinedAt;
};

export const calculateTotalExpense = (
  transactions?: TransactionInterface[]
) => {
  if (!transactions)
    return {
      totalExpense: 0,
      totalGroupExpense: 0,
      splittable: 0,
      unSplittable: 0,
      groupTransactions: 0,
      personalTransactions: 0,
    };
  let totalExpense = 0;
  let splittable = 0;
  let unSplittable = 0;
  let groupTransactions = 0;
  let personalTransactions = 0;
  transactions.map((transaction) => {
    totalExpense += transaction.amount;
    if (transaction.split) {
      groupTransactions += 1;
      splittable += transaction.amount;
    } else {
      personalTransactions += 1;
      unSplittable += transaction.amount;
    }
  });

  return {
    totalExpense,
    totalGroupExpense: totalExpense - unSplittable,
    splittable,
    unSplittable,
    groupTransactions,
    personalTransactions,
  };
};

export const calculatePersonalExpense = (
  group?: GroupInterface | null,
  transactions?: TransactionInterface[],
  userId?: string,
  groupMembers?: number
) => {
  if (!transactions || !userId || !groupMembers || !group)
    return {
      totalExpense: 0,
      contribution: 0,
      balance: 0,
      personalExpense: 0,
    };
  let expense = 0;
  let personalExpense = 0;
  let contribution = 0;
  transactions.map((transaction) => {
    let groupMembers = group.members.filter(
      (m) => new Date(m.createdAt) < new Date(transaction.createdAt)
    ).length;
    if (transaction.transactionBy._id === userId && transaction.split) {
      contribution += transaction.amount;
    }
    if (
      transaction.split &&
      !transaction.exclude?.find((member) => member._id === userId)
    ) {
      let goingToSplitMoney = transaction.amount / (groupMembers - (transaction?.exclude?.length ?? 0));
      expense += goingToSplitMoney;
    }

    if (!transaction.split && transaction.transactionBy._id === userId) {
      personalExpense += transaction.amount;
    }
  });
  return {
    totalExpense: expense,
    contribution,
    personalExpense,
    balance: contribution - expense,
  };
};

export const generateTransactionGraphData = (
  transactions: TransactionInterface[]
) => {
  let total = 0;
  return transactions
    .filter((t) => t.split)
    .map((transaction) => {
      total += transaction.amount;
      return {
        label:
          transaction.transactionBy.firstName ||
          transaction.transactionBy.displayName.split(" ")[0],
        value: total,
      };
    });
};
