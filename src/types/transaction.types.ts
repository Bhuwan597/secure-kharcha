import { UserDetailsInterface } from "@/contexts/user.context";

export interface TransactionInterface {
  _id: string;
  transactionBy: UserDetailsInterface;
  title: string;
  amount: number;
  split: boolean;
  excludedMembers?: UserDetailsInterface[];
  createdAt: string;
  updatedAt: string;
}
