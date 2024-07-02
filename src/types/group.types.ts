import { UserDetailsInterface } from "@/contexts/user.context";

export interface GroupInterface {
  _id: string;
  name: string;
  description: string;
  coverPhoto?: string;
  owner: UserDetailsInterface;
  members: UserDetailsInterface[];
  transactions?: string[];
  activities?: string[];
  token?: string[];
  createdAt?: string;
  updatedAt?: string;
}
