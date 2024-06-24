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
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 place-items-center my-4">
        {recentActivities.map((activity) => (
          <Card key={activity.id} className="mb-4 w-fit h-full">
            <CardHeader>
              <CardTitle>{activity.action}</CardTitle>
            </CardHeader>
            <CardContent>
              <p>{activity.description}</p>
            </CardContent>
            <CardFooter>
              <span>{activity.timestamp}</span>
            </CardFooter>
          </Card>
        ))}
      </div>
    </ContainerSection>
  );
};

export default RecentActivities;
