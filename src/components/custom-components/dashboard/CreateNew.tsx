import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {  Save, Users } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import CustomButton from "@/components/custom-components/CustomButton";

const CreateNew = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <CustomButton className="bg-primary-color">
          <Users className="mr-2 h-4 w-4" />
          Create new
        </CustomButton>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] bg-light-color text-dark-color dark:bg-dark-color dark:text-light-color">
        <DialogHeader>
          <DialogTitle>Create New Group</DialogTitle>
          <DialogDescription>
            Make a new group to split expenses among other members. Click save when you&apos;re done.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Group Name
            </Label>
            <Input id="name"  className="col-span-3" placeholder="E.g Family Vacation" />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="description" className="text-right">
              Description
            </Label>
            <Textarea id="description" className="col-span-3" placeholder="Description of the group"/>
          </div>
        </div>
        <DialogFooter>
        <CustomButton type="submit" className="bg-secondary-color">
          <Save className="mr-2 h-4 w-4" />
         Save
        </CustomButton>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default CreateNew;
