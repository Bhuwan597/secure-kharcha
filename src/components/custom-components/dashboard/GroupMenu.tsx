"use client";
import ContainerSection from "@/components/partials/ContainerSection";
import React, { useEffect, useState } from "react";
import {
  BadgeDollarSign,
  Check,
  QrCode,
  Save,
  Settings,
  UserPlus,
} from "lucide-react";
import CustomButton, { buttonVariant } from "../CustomButton";
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
import TransactionForm from "../../forms/TransactionForm";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { QRCodeSVG } from "qrcode.react";
import GenerateLink from "./GenerateLink";
import { UserDetailsInterface } from "@/contexts/user.context";
import { GroupInterface } from "@/types/group.types";

const GroupMenu = ({
  owner,
  groupInfo,
}: {
  owner: UserDetailsInterface | null;
  groupInfo: GroupInterface;
}) => {
  const [link, setLink] = useState(
    `https://secure-kharcha.vercel.app/join?group=${groupInfo.uid}&token=${groupInfo.token}`
  );
  const [copied, setCopied] = useState(false);
  const handleCopyLink = () => {
    navigator.clipboard.writeText(link);
    setCopied(true);
  };

  useEffect(() => {
    setLink(
      `https://secure-kharcha.vercel.app/join?group=${groupInfo.uid}&token=${groupInfo.token}`
    );
  }, [groupInfo]);

  useEffect(() => {
    if (!copied) return;
    setTimeout(() => {
      setCopied(false);
    }, 2000);
  }, [copied]);

  return (
    <ContainerSection className="flex flex-row justify-between items-center mt-6">
      <div className="flex flex-row justify-center items-center gap-4">
        <Dialog>
          <DialogTrigger asChild>
            <CustomButton className="flex flex-row justify-center items-center gap-2 bg-secondary-color">
              <Settings size={20} />
              <span className="hidden sm:inline">Settings</span>
            </CustomButton>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Edit group</DialogTitle>
              <DialogDescription>
                Make changes to your group profile here. Click save when
                you&apos;re done.
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
                  value={groupInfo.name}
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
                  value={groupInfo.description}
                />
              </div>
              <CustomButton type="submit" className="bg-secondary-color">
                <Save className="mr-2 h-4 w-4" />
                Save
              </CustomButton>
            </div>
          </DialogContent>
        </Dialog>

        <Dialog>
          <DialogTrigger asChild>
            <CustomButton className="flex flex-row justify-center items-center gap-2 bg-primary-color">
              <UserPlus size={20} />
              <span className="hidden sm:inline">Invite</span>
            </CustomButton>
          </DialogTrigger>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Share link</DialogTitle>
              <DialogDescription>
                Anyone who has this link will be able to join this group.
              </DialogDescription>
            </DialogHeader>
            <div className="flex items-center space-x-2">
              <div className="grid flex-1 gap-2">
                <Label htmlFor="link" className="sr-only">
                  Link
                </Label>
                <Input id="link" defaultValue={link} readOnly />
              </div>
              <Button
                onClick={handleCopyLink}
                type="submit"
                size="sm"
                className="px-3"
                disabled={copied}
              >
                <span className="sr-only">Copy</span>
                {copied ? (
                  <Check className="h-4 w-4" />
                ) : (
                  <Copy className="h-4 w-4" />
                )}
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

        <Dialog>
          <DialogTrigger asChild>
            <CustomButton className="flex flex-row justify-center items-center gap-2 bg-black ring-1">
              <BadgeDollarSign size={20} />
              <span className="hidden sm:inline">Add Transaction</span>
            </CustomButton>
          </DialogTrigger>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Add Transaction</DialogTitle>
              <DialogDescription>
                Add a transaction and get added to splitter.
              </DialogDescription>
            </DialogHeader>
            <TransactionForm />
          </DialogContent>
        </Dialog>
      </div>

      <Dialog>
        <DialogTrigger asChild>
          <CustomButton variant={buttonVariant.ghost}>
            <QrCode size={30} className="text-green-600" />
          </CustomButton>
        </DialogTrigger>
        <DialogContent>
          <Card>
            <CardHeader>
              <CardTitle>QR Code</CardTitle>
              <CardDescription>
                Scan the qr code to pay with esewa.
              </CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col justify-center items-center">
              {owner ? (
                <AspectRatio ratio={4 / 3} className="bg-muted">
                  <QRCodeSVG
                    className="w-full h-full p-4"
                    value={JSON.stringify({
                      eSewa_id: `${owner?.phoneNumber}`,
                      name: `${owner?.displayName}`,
                    })}
                  />
                </AspectRatio>
              ) : (
                <>No Details Found</>
              )}
            </CardContent>
          </Card>
        </DialogContent>
      </Dialog>
    </ContainerSection>
  );
};

export default GroupMenu;
