import GroupInfo from "@/components/custom-components/dashboard/GroupInfo";
import React from "react";

const Page = ({params}: { params: { slug: string } }) => {
  return (
    <>
      <GroupInfo/>
    </>
  );
};

export default Page;
