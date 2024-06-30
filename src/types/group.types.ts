import { UserDetailsInterface } from "@/contexts/user.context";

export interface GroupInterface {
  uid: string;
  name: string;
  description: string;
  coverPhoto?: string;
  owner: string;
  members: string[];
  transactions?: string[];
  activities?: string[];
  token?: string[];
  createdAt?: string;
}
