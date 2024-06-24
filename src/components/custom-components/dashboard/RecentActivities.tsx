import ContainerSection from "@/components/partials/ContainerSection";
import { Separator } from "@/components/ui/separator";
import React from "react";
import {
  Card,
  CardHeader,
  CardContent,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";

interface ActivityInterface {
  id: number;
  user: string;
  action: string;
  description: string;
  timestamp: string;
}

const recentActivities: ActivityInterface[] = [
  {
    id: 1,
    user: "John Doe",
    action: "added an expense",
    description: "Dinner at restaurant",
    timestamp: "2024-06-23 10:00 AM",
  },
  {
    id: 2,
    user: "Jane Smith",
    action: "settled up",
    description: "Paid $50",
    timestamp: "2024-06-23 09:45 AM",
  },
  {
    id: 3,
    user: "Mark Johnson",
    action: "joined the group",
    description: "",
    timestamp: "2024-06-23 09:30 AM",
  },
  {
    id: 4,
    user: "Emily Davis",
    action: "updated an expense",
    description: "Changed amount for groceries",
    timestamp: "2024-06-23 09:15 AM",
  },
  {
    id: 5,
    user: "Michael Brown",
    action: "left a comment",
    description: "Need to settle expenses by Friday",
    timestamp: "2024-06-23 09:00 AM",
  },
];

const RecentActivities = () => {
  return (
    <ContainerSection className="flex flex-col items-start justify-center">
      <h2 className="text-xl text-secondary-color font-bold">
        Recent Activities
      </h2>
      <Separator className="my-4" />
      <ScrollArea className="w-full mb-10 h-72">
      {recentActivities.map((activity) => (
          <div key={activity.id} className="flex flex-row justify-start items-center gap-2 my-4">
            <p className="font-bold">{activity.user}</p>
            <p className="">{activity.action}</p>
            <p className="text-xs">({activity.timestamp})</p>
          </div>
        ))}
      </ScrollArea>
    </ContainerSection>
  );
};

export default RecentActivities;
