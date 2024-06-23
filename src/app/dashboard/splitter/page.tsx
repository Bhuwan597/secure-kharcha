import Heading from "@/components/custom-components/dashboard/Heading";
import PreviousExpensesGroups from "@/components/custom-components/dashboard/PreviousExpensesGroups";
import React from "react";

const Page = () => {
  return (
    <>
      <Heading title="Expense Splitter" />
      <PreviousExpensesGroups/>
    </>
  );
};

export default Page;
