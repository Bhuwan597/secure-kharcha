"use client";
import { useAuth } from "@/contexts/user.context";
import React from "react";

const Page = () => {
  const { userDetails } = useAuth();
  return (
    <div className="flex flex-col justify-center items-center gap-4 text-center">
      <p>{userDetails?._id}</p>
      <p>{userDetails?.firstName}</p>
      <p>{userDetails?.lastName}</p>
      <p>{userDetails?.displayName}</p>
      <p>{userDetails?.email}</p>
      <p>{userDetails?.emailVerified && "Yes"}</p>
      <p>{userDetails?.photo}</p>
      <p>{userDetails?.provider}</p>
      <p>{userDetails?.createdAt}</p>
      <p>{userDetails?.updatedAt}</p>
      <p>{userDetails?.eSewa}</p>
    </div>
  );
};

export default Page;
