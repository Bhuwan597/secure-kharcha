import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import React, { useState } from "react";
import CustomButton from "../custom-components/CustomButton";
import { useMutation } from "@tanstack/react-query";

export function ConfirmAction({
  isOpen,
  setIsOpen,
  loading,
  continueFunction,
}: {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  loading: boolean;
  continueFunction: ()=> void
}) {
  const mutation = useMutation({
    mutationKey: ["delete-transaction-using-modal"],
    mutationFn: async()=> await continueFunction(),
    onSuccess: ()=> setIsOpen(false)
  })
  return (
    <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            Click continue to if you are sure about. If you are not sure simply
            cancel.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <CustomButton className="bg-secondary-color" loading={mutation.isPending || loading} onClick={()=>mutation.mutate()} >Continue</CustomButton>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
