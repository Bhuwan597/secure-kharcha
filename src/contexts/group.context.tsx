import { db } from "@/config/firebase.config";
import { GroupInterface } from "@/types/group.types";
import { useQuery } from "@tanstack/react-query";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import React, { createContext, useContext } from "react";
import { useAuth } from "./user.context";

interface GroupContextType {
  groups: GroupInterface[] | null;
  refetch: () => void;
  loading: boolean;
  error: Error | null;
}

const GroupContext = createContext<GroupContextType>({
  groups: null,
  refetch: () => {},
  loading: true,
  error: null,
});

export const GroupContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const { userDetails } = useAuth();

  
const fetchGroups = async (uid: string): Promise<GroupInterface[]> => {
  const groupRef = collection(db, "groups");
  const q = query(groupRef, where("owner", "==", uid));
  const querySnapShot = await getDocs(q);
  return querySnapShot.docs.map(
    (doc) => ({ uid: doc.id, ...doc.data() } as GroupInterface)
  );
};


  const {
    data: groups,
    isLoading,
    error,
    refetch,
  } = useQuery<GroupInterface[], Error>({
    queryKey: ["groups-data", userDetails?.uid],
    queryFn: () => fetchGroups(userDetails?.uid as string),
    enabled: !!userDetails?.uid,
  });

  return (
    <GroupContext.Provider
      value={{
        groups: groups || [],
        refetch,
        loading: isLoading,
        error: error,
      }}
    >
      {children}
    </GroupContext.Provider>
  );
};

export const useGroup = () => {
  return useContext(GroupContext);
};
