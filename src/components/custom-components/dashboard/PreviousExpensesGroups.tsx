import ContainerSection from "@/components/partials/ContainerSection";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { IndianRupee, ScanLine } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import CreateNew from "./CreateNew";

const expenseDetails = [
  {
    title: "Bill of Hackathon in Pokhara Engineering College",
    total: 3487,
    created: "Yesterday",
    usersCount: 96,
    transactionsCount: 45,
  },
  {
    title: "Company Team Building Retreat",
    total: 2500,
    created: "Two days ago",
    usersCount: 15,
    transactionsCount: 30,
  },
  {
    title: "Weekend Trip to Mountain Resort",
    total: 1800,
    created: "Last week",
    usersCount: 8,
    transactionsCount: 20,
  },
  {
    title: "Family Reunion Dinner",
    total: 1200,
    created: "Last weekend",
    usersCount: 12,
    transactionsCount: 15,
  },
  {
    title: "Office Lunch Outing",
    total: 450,
    created: "Today",
    usersCount: 20,
    transactionsCount: 10,
  },
  {
    title: "Community Charity Event",
    total: 3500,
    created: "Three days ago",
    usersCount: 50,
    transactionsCount: 40,
  },
  {
    title: "Bachelor Party Expenses",
    total: 2200,
    created: "Last month",
    usersCount: 10,
    transactionsCount: 25,
  },
  {
    title: "Sports Club Tournament Fees",
    total: 2700,
    created: "Last week",
    usersCount: 30,
    transactionsCount: 35,
  },
  {
    title: "Wedding Reception Costs",
    total: 4000,
    created: "Two weeks ago",
    usersCount: 100,
    transactionsCount: 60,
  },
  {
    title: "College Project Funding",
    total: 500,
    created: "Last semester",
    usersCount: 5,
    transactionsCount: 5,
  },
];

const PreviousExpensesGroups = () => {
  return (
    <ContainerSection className="flex flex-col gap-6 justify-center items-start">
      <div className="flex flex-row justify-between items-center gap-4 w-full flex-wrap">
        <h2 className="text-lg font-semibold italic">
          Expenses Groups
        </h2>
        <CreateNew />
      </div>
      <div className="flex flex-col justify-center items-start gap-4 w-full">
        {expenseDetails.map((detail, index) => (
          <Link
            key={index}
            href={"/dashboard/splitter/fjsda-fdslkfd-fdslfs"}
            className="bg-slate-100 hover:bg-slate-300 dark:bg-slate-900 dark:hover:bg-slate-800 w-full p-2 rounded-lg transition-all ease-in-out duration-200 flex flex-col lg:flex-row justify-between items-center gap-4"
          >
            <div className="flex flex-row justify-center items-center gap-4 flex-wrap">
              <div className="w-[50px] md:w-[75px]">
                <AspectRatio ratio={1 / 1}>
                  <Image
                    src={"/images/test.jpg"}
                    alt="Image"
                    fill
                    className="rounded-md object-cover"
                  />
                </AspectRatio>
              </div>

              <h3 className="italic text-clip font-semibold">
                {detail.title}
                <p className="text-sm font-extralight">{detail.created}</p>
              </h3>
            </div>

            <div className="flex flex-row gap-10 items-center justify-center">
              <p className="font-bold text-xl flex flex-row items-center justify-center gap-2">
                <IndianRupee size={20} className="text-secondary-color" />{" "}
                {detail.total}
              </p>
              <p className="flex flex-row items-center justify-center gap-2 text-xl font-bold">
                <ScanLine size={22} className="text-secondary-color" />{" "}
                {detail.transactionsCount}
              </p>
              <div className="flex -space-x-4 rtl:space-x-reverse">
                <div className="w-10 h-10 border-2 border-white rounded-full dark:border-gray-800">
                  <AspectRatio ratio={1 / 1}>
                    <Image
                      fill
                      className="rounded-full"
                      src="/images/test.jpg"
                      alt=""
                    />
                  </AspectRatio>
                </div>
                <div className="w-10 h-10 border-2 border-white rounded-full dark:border-gray-800">
                  <AspectRatio ratio={1 / 1}>
                    <Image
                      fill
                      className="rounded-full"
                      src="/images/test.jpg"
                      alt=""
                    />
                  </AspectRatio>
                </div>
                <div className="w-10 h-10 border-2 border-white rounded-full dark:border-gray-800">
                  <AspectRatio ratio={1 / 1}>
                    <Image
                      fill
                      className="rounded-full"
                      src="/images/test.jpg"
                      alt=""
                    />
                  </AspectRatio>
                </div>

                <div className="flex items-center justify-center w-10 h-10 text-xs font-medium text-white bg-gray-700 border-2 border-white rounded-full hover:bg-gray-600 dark:border-gray-800 z-10 cursor-pointer">
                  +{detail.usersCount}
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </ContainerSection>
  );
};

export default PreviousExpensesGroups;
