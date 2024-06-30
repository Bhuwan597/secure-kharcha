"use client";
import React, { useEffect, useState } from "react";
import ExpenseChart from "@/components/custom-components/dashboard/ExpenseChart";
import ExpenseSummary from "@/components/custom-components/dashboard/ExpenseSummary";
import GroupMembers from "@/components/custom-components/dashboard/GroupMembers";
import GroupMenu from "@/components/custom-components/dashboard/GroupMenu";
import Heading from "@/components/custom-components/dashboard/Heading";
import RecentActivities from "@/components/custom-components/dashboard/RecentActivities";
import { TransactionsTable } from "@/components/custom-components/dashboard/TransactionsTable";
import ContainerSection from "@/components/partials/ContainerSection";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CameraIcon } from "lucide-react";
import Image from "next/image";
import { doc, getDoc, query, where } from "firebase/firestore";
import { db } from "@/config/firebase.config";
import { GroupInterface } from "@/types/group.types";
import { useQuery } from "@tanstack/react-query";
import { UserDetailsInterface, useAuth } from "@/contexts/user.context";
import Loading from "@/app/loading";
import { toast } from "@/components/ui/use-toast";
import { notFound } from "next/navigation";

const getGroupInfo = async (slug: string): Promise<GroupInterface | null> => {
  try {
    const groupRef = doc(db, "groups", slug);
    const docSnap = await getDoc(groupRef);
    const groupData = {uid: slug  ,...docSnap.data()} as GroupInterface;

    return groupData;
  } catch (error) {
    console.log(error);
    return null;
  }
};

const GroupInfo = ({ slug }: { slug: string }) => {
  const { userDetails } = useAuth();
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ["group-info", userDetails?.uid],
    queryFn: () => getGroupInfo(slug),
  });

  const [owner, setOwner] = useState<UserDetailsInterface | null>(null);
  const [members, setMembers] = useState<
    (UserDetailsInterface | null)[] | null
  >(null);
  const [transactions, setTransactions] = useState(null);
  const [activities, setActivities] = useState(null);
  const [fetchAgain, setFetchAgain] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    refetch();
  }, [fetchAgain]);

  async function getOwner(uid?: string) {
    if (!uid) return null;
    const userDocRef = doc(db, "users", uid);
    const userDocSnap = await getDoc(userDocRef);
    setOwner(userDocSnap.data() as UserDetailsInterface);
  }

  async function getMembers(members?: string[]) {
    if (!members || members.length < 0) {
      return;
    }
    const membersList = members.map(async (m) => {
      const docRef = doc(db, "users", m);
      const docSnap = await getDoc(docRef);
      if (!docSnap.exists()) {
        return null;
      }
      return docSnap.data() as UserDetailsInterface;
    });

    setMembers(await Promise.all(membersList));
  }

  useEffect(() => {
    if(loading) return;
    try {
        getMembers(data?.members);
        getOwner(data?.owner);
        
    } catch (error) {
        console.log(error)
    }
  }, [fetchAgain, data]);

  if (isLoading) {
    return <Loading />;
  }
  if (error) {
    toast({
      title: "Error",
      description: error.message,
    });
    return null;
  }

  if(!data || data.owner !== userDetails?.uid || !data.members.includes(userDetails.uid)) return notFound();
  return (
    <>
      <Heading title={data?.name} />
      <ContainerSection>
        <div className="w-full relative">
          <AspectRatio ratio={16 / 5}>
            <Image
              fill
              src="/images/group.jpg"
              alt="Image"
              className="rounded-md object-cover"
            />
          </AspectRatio>
        </div>
      </ContainerSection>
      <GroupMenu owner={owner} groupInfo={data} />
      <ContainerSection className="flex flex-col justify-center items-center gap-4 my-10">
        <h3 className="mb-1.5 text-2xl font-semibold text-black dark:text-white">
          {data.name}
        </h3>
        <p className="font-medium">Created by {owner?.displayName}</p>
        <p className="text-sm">{data.createdAt}</p>
        <div className="mx-auto mb-5.5 mt-4.5 grid max-w-94 grid-cols-3 rounded-md border border-stroke py-2.5 shadow-1 dark:border-strokedark dark:bg-[#37404F]">
          <div className="flex flex-col items-center justify-center gap-1 border-r border-stroke px-4 dark:border-strokedark xsm:flex-row">
            <span className="font-semibold text-black dark:text-white">
              Rs. 25945
            </span>
            <span className="text-sm">Expense</span>
          </div>
          <div className="flex flex-col items-center justify-center gap-1 border-r border-stroke px-4 dark:border-strokedark xsm:flex-row">
            <span className="font-semibold text-black dark:text-white">
              {data.transactions?.length || 0}
            </span>
            <span className="text-sm">Transactions</span>
          </div>
          <div className="flex flex-col items-center justify-center gap-1 px-4 xsm:flex-row">
            <span className="font-semibold text-black dark:text-white">
              {data.members.length || 0}
            </span>
            <span className="text-sm">Members</span>
          </div>
        </div>

        <div className="mx-auto w-full text-center">
          <h4 className="font-semibold text-black dark:text-white">
            About the group
          </h4>
          <p className="mt-4.5">{data.description}</p>
        </div>
        <GroupMembers owner={owner} members={members} />
      </ContainerSection>
      <RecentActivities />
      <TransactionsTable />
      <ExpenseChart />
      <ExpenseSummary />
    </>
  );
};

export default GroupInfo;
