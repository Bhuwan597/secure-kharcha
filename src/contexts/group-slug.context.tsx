"use client";
import { GroupInterface } from "@/types/group.types";
import { useQuery } from "@tanstack/react-query";
import { createContext, useContext, useMemo } from "react";
import { useAuth } from "./user.context";
import Loading from "@/app/loading";
import { toast } from "@/components/ui/use-toast";
import { notFound } from "next/navigation";

interface GroupSlugContextType {
  group: GroupInterface | null;
  isPending: boolean;
  error: any;
}

const GroupSlugContext = createContext<GroupSlugContextType>({
  group: null,
  isPending: false,
  error: null,
});

const fetchGroupBySlug = async (slug: string, token?: string) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/groups/${slug}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  if (!response.ok) {
    throw new Error("Failed to fetch group data");
  }
  return (await response.json()) as GroupInterface;
};

export const GroupSlugProvider = ({
  slug,
  children,
}: {
  slug: string;
  children: React.ReactNode;
}) => {
  const { userDetails } = useAuth();
  const { data, isPending, error } = useQuery({
    queryKey: ["group-slug-data", ""],
    queryFn: async () => await fetchGroupBySlug(slug, userDetails?.token),
    enabled: !!slug,
  });
  if (isPending) {
    return <Loading />;
  }
  if (error) {
    toast({
      title: "Error",
      description: error.message,
    });
  }
  if (!data) return notFound();
  return (
    <GroupSlugContext.Provider
      value={{
        group: data,
        isPending: isPending,
        error: error,
      }}
    >
      {children}
    </GroupSlugContext.Provider>
  );
};

export const useGroupSlug = () => {
  const context = useContext(GroupSlugContext);
  if (!context) {
    throw new Error("useGroupSlug must be used within a GroupSlugProvider");
  }
  return context;
};
