"use client"
import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {  Users } from "lucide-react";
import CustomButton from "@/components/custom-components/CustomButton";
import CreateGroupForm from "@/components/forms/CreateGroupForm";

const CreateNew = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogTrigger asChild>
        <CustomButton onClick={()=>setIsDialogOpen(true)} className="bg-primary-color">
          <Users className="mr-2 h-4 w-4" />
          Create new
        </CustomButton>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] bg-light-color text-dark-color dark:bg-dark-color dark:text-light-color">
        <DialogHeader>
          <DialogTitle>Create New Group</DialogTitle>
          <DialogDescription>
            Make a new group to split expenses among other members. Click save
            when you&apos;re done.
          </DialogDescription>
        </DialogHeader>
        <CreateGroupForm setIsDialogOpen={setIsDialogOpen} />
      </DialogContent>
    </Dialog>
  );
};

export default CreateNew;
