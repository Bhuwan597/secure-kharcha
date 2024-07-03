import { TransactionInterface } from "@/types/transaction.types";

export const calculateTotalExpense = (transactions: TransactionInterface[]) => {
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
  transactions?: TransactionInterface[],
  userId?: string,
  groupMembers?: number
) => {
  if (!transactions || !userId || !groupMembers)
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
    if (transaction.transactionBy._id === userId && transaction.split) {
      contribution += transaction.amount;
    }
    if (
      transaction.split &&
      !transaction.excludedMembers?.find((member) => member._id === userId)
    ) {
      let goingToSplitMoney = transaction.amount / groupMembers;
      expense += goingToSplitMoney;
    }
    if (!transaction.split) {
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
          transaction.transactionBy.firstName[0] +
          transaction.transactionBy.lastName[0],
        value: total,
      };
    });
};
