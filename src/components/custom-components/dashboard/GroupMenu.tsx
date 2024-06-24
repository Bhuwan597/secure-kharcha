import ContainerSection from "@/components/partials/ContainerSection";
import React from "react";
import { Save, Settings, UserPlus } from "lucide-react";
import CustomButton from "../CustomButton";
import { Copy } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

const GroupMenu = () => {
  return (
    <ContainerSection className="flex flex-row justify-center items-center mt-6">
      <div className="flex flex-row justify-center items-center gap-4">
        <Dialog>
          <DialogTrigger asChild>
            <CustomButton className="flex flex-row justify-center items-center gap-2 bg-secondary-color">
              <Settings size={20} />
              <span>Settings</span>
            </CustomButton>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Edit group</DialogTitle>
              <DialogDescription>
              Make changes to your group profile here. Click save when you're done.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-right">
                  Group Name
                </Label>
                <Input
                  id="name"
                  className="col-span-3"
                  placeholder="E.g Family Vacation"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="description" className="text-right">
                  Description
                </Label>
                <Textarea
                  id="description"
                  className="col-span-3"
                  placeholder="Description of the group"
                />
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

        <Dialog>
          <DialogTrigger asChild>
            <CustomButton className="flex flex-row justify-center items-center gap-2 bg-primary-color">
              <UserPlus size={20} />
              <span>Invite</span>
            </CustomButton>
          </DialogTrigger>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Share link</DialogTitle>
              <DialogDescription>
                Anyone who has this link will be able to view this.
              </DialogDescription>
            </DialogHeader>
            <div className="flex items-center space-x-2">
              <div className="grid flex-1 gap-2">
                <Label htmlFor="link" className="sr-only">
                  Link
                </Label>
                <Input
                  id="link"
                  defaultValue="https://ui.shadcn.com/docs/installation"
                  readOnly
                />
              </div>
              <Button type="submit" size="sm" className="px-3">
                <span className="sr-only">Copy</span>
                <Copy className="h-4 w-4" />
              </Button>
            </div>
            <DialogFooter className="sm:justify-start">
              <DialogClose asChild>
                <Button type="button" variant="secondary">
                  Close
                </Button>
              </DialogClose>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </ContainerSection>
  );
};

export default GroupMenu;
