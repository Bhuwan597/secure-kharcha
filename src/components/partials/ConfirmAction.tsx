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

export function ConfirmAction({
  isOpen,
  setIsOpen,
  loading,
  continueFunction,
}: {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  loading: boolean;
  continueFunction: ()=> Promise<void>
}) {
  const okFunction = async()=>{
    try {      
      await continueFunction();
      setIsOpen(false)
    } catch (error) {
      setIsOpen(false)
    }
  }
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
          <CustomButton className="bg-secondary-color" loading={loading} onClick={okFunction} >Continue</CustomButton>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
