import { UserDetailsInterface } from "@/contexts/user.context";
import { TransactionInterface } from "./transaction.types";

export interface GroupMemberInterface{
  user: UserDetailsInterface;
  createdAt: string
}
export interface ActivityInterface{
  _id: string;
  displayName: string;
  content: string;
  createdAt: string;
}

export interface GroupInterface {
  _id: string;
  name: string;
  description: string;
  photo?: string;
  owner: UserDetailsInterface;
  members: GroupMemberInterface[];
  transactions?: TransactionInterface[];
  activities?: ActivityInterface[];
  token?: string[];
  createdAt?: string;
  updatedAt?: string;
}
