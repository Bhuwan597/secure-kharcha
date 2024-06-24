import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { CalendarDays } from "lucide-react";
type GroupMember = {
  id: string;
  name: string;
  email: string;
  avatarUrl: string;
};

const groupMembers: GroupMember[] = [
  {
    id: "1",
    name: "John Doe",
    email: "john@example.com",
    avatarUrl: "https://via.placeholder.com/150",
  },
  {
    id: "2",
    name: "Jane Smith",
    email: "jane@example.com",
    avatarUrl: "https://via.placeholder.com/150",
  },
  {
    id: "3",
    name: "Mark Johnson",
    email: "mark@example.com",
    avatarUrl: "https://via.placeholder.com/150",
  },
  {
    id: "4",
    name: "Emily Davis",
    email: "emily@example.com",
    avatarUrl: "https://via.placeholder.com/150",
  },
];

const GroupMembers = () => {
  return (
    <>
      <div className="w-full mt-4">
        <h2 className="text-xl text-left text-secondary-color font-bold">
          Members
        </h2>
        <Separator className="my-4" />
      </div>
      <div className="flex flex-row justify-start items-center flex-wrap w-full gap-6">
        {groupMembers.map((member) => (
          <div
            key={member.id}
            className="group-member flex items-center space-x-4 p-4"
          >
            <Avatar>
              <AvatarImage src={member.avatarUrl} alt={member.name} />
              <AvatarFallback>{member.name[0]}</AvatarFallback>
            </Avatar>
            <div>
              <div className="font-medium">{member.name}</div>
              <div className="text-sm text-gray-500">{member.email}</div>
              <div className="flex items-center pt-2">
                <CalendarDays className="mr-2 h-4 w-4 opacity-70" />{" "}
                <span className="text-xs text-muted-foreground">
                  Joined December 2021
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default GroupMembers;
