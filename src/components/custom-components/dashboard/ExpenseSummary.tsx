import ContainerSection from "@/components/partials/ContainerSection";
import { Separator } from "@/components/ui/separator";
import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const expenseSummary = [
  {
    fullName: "John Doe",
    user: "john@example.com",
    totalExpense: 3200,
    balance: 200,
    contribution: 3400,
  },
  {
    fullName: "Susan Smith",
    user: "susan@example.com",
    totalExpense: 1500,
    balance: -500,
    contribution: 1000,
  },
  {
    fullName: "Mike Johnson",
    user: "mike@example.com",
    totalExpense: 4200,
    balance: 700,
    contribution: 4900,
  },
  {
    fullName: "Linda Brown",
    user: "linda@example.com",
    totalExpense: 2700,
    balance: -300,
    contribution: 2400,
  },
  {
    fullName: "Kevin White",
    user: "kevin@example.com",
    totalExpense: 3100,
    balance: 900,
    contribution: 4000,
  },
  {
    fullName: "Rachel Green",
    user: "rachel@example.com",
    totalExpense: 1900,
    balance: -100,
    contribution: 1800,
  },
];


const ExpenseSummary = () => {
  return (
    <>
      <ContainerSection className="my-10">
        <div className="w-full mt-4">
          <h2 className="text-xl text-left text-secondary-color font-bold">
            Expense Summary
          </h2>
          <Separator className="my-4" />
        </div>
        <div className="flex flex-row gap-4 flex-wrap items-center justify-center sm:justify-start">
          {expenseSummary.map((expense,index) => {
            return (
              <Card key={index+1}>
                <CardHeader>
                  <CardTitle>{expense.fullName}</CardTitle>
                  <CardDescription>{expense.user}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-row items-center gap-4">
                    <span className="font-medium text-lg">Contribution</span>
                    <span>
                      {new Intl.NumberFormat("en-NP", {
                        style: "currency",
                        currency: "NPR",
                      }).format(expense.contribution)}
                    </span>
                  </div>
                  <div className={"flex flex-row items-center gap-4"}>
                    <span className="font-medium text-lg">Balance</span>
                    <span
                      className={
                        expense.balance < 0 ? "text-red-600" : "text-green-600"
                      }
                    >
                      {new Intl.NumberFormat("en-NP", {
                        style: "currency",
                        currency: "NPR",
                      }).format(expense.balance)}
                    </span>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </ContainerSection>
    </>
  );
};

export default ExpenseSummary;
