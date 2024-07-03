import { UserDetailsInterface } from "@/contexts/user.context";
import { TransactionInterface } from "./transaction.types";

export interface GroupInterface {
  _id: string;
  name: string;
  description: string;
  coverPhoto?: string;
  owner: UserDetailsInterface;
  members: UserDetailsInterface[];
  transactions?: TransactionInterface[];
  activities?: string[];
  token?: string[];
  createdAt?: string;
  updatedAt?: string;
}
