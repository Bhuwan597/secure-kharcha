"use client";
import ContainerSection from "@/components/partials/ContainerSection";
import { Separator } from "@/components/ui/separator";
import React from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useGroupSlug } from "@/contexts/group-slug.context";
import { ActivityInterface } from "@/types/group.types";
import { calculateNepaliDateAndTime } from "@/lib/date_calculations";

const RecentActivities = () => {
  const { group } = useGroupSlug();
  if (!group) return null;
  return (
    <ContainerSection className="flex flex-col items-start justify-center">
      <h2 className="text-xl text-secondary-color font-bold">
        Recent Activities
      </h2>
      <Separator className="my-4" />
      <ScrollArea className="w-full mb-10 h-72">
        {group.activities &&
          group.activities
            .sort(
              (a, b) =>
                new Date(b.createdAt).getTime() -
                new Date(a.createdAt).getTime()
            )
            .map((activity) => {
              const dateTime = calculateNepaliDateAndTime(activity.createdAt);
              return (
                <>
                <div key={activity._id} className="flex flex-col gap-2 my-4">
                  <div className="flex flex-row gap-2 justify-start items-center">
                    <p className="font-bold">{activity.displayName}</p>
                    <p className="">{activity.content}</p>
                  </div>
                  <p className="text-xs flex flex-row gap-2 items-center">
                    <span>
                      {dateTime.nepaliDate} <span>{dateTime.time}</span>
                    </span>
                  </p>
                </div>
                <Separator className="my-2"/>
                </>
              );
            })}
      </ScrollArea>
    </ContainerSection>
  );
};

export default RecentActivities;
