"use client";
import ContainerSection from "@/components/partials/ContainerSection";
import React, { useState } from "react";
import {
  BadgeDollarSign,
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

const GroupMenu = () => {
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
                Anyone who has this link will be able to view this.
              </DialogDescription>
            </DialogHeader>
            <GenerateLink />
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
          <Tabs defaultValue="qr_code" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="qr_code">QR Code</TabsTrigger>
              <TabsTrigger value="payment_info">Payment Info</TabsTrigger>
            </TabsList>
            <TabsContent value="qr_code">
              <Card>
                <CardHeader>
                  <CardTitle>QR Code</CardTitle>
                  <CardDescription>
                    Scan the qr code to pay with esewa.
                  </CardDescription>
                </CardHeader>
                <CardContent className="flex flex-col justify-center items-center">
                  <AspectRatio ratio={4 / 3} className="bg-muted">
                    <QRCodeSVG
                      className="w-full h-full p-4"
                      value={JSON.stringify({
                        eSewa_id: "9848984269",
                        name: "Ankush Kunwar",
                      })}
                    />
                  </AspectRatio>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="payment_info">
              <Card>
                <CardHeader>
                  <CardTitle>Payment Information</CardTitle>
                  <CardDescription>
                    These are the payment information of the owner.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-2">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Eum
                  cum libero reiciendis? Molestias optio, quae explicabo
                  corrupti ipsum est sint, sequi, facere mollitia vitae
                  asperiores similique consequatur beatae quo laborum possimus
                  cum molestiae. Odit obcaecati officia quidem labore autem id
                  tempora incidunt sequi sed aut! Suscipit totam rerum quae
                  assumenda aut consectetur quidem quia cumque voluptas corporis
                  aliquid necessitatibus porro quos nulla et dicta nesciunt
                  consequatur, libero ut labore debitis fugiat commodi? Numquam
                  tempore illum tempora incidunt, ipsam praesentium corporis
                  possimus. Accusantium aspernatur itaque officiis quos alias
                  asperiores dolorem et adipisci? Ipsam quidem beatae excepturi
                  natus accusamus cupiditate repellat reiciendis?
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </DialogContent>
      </Dialog>
    </ContainerSection>
  );
};

export default GroupMenu;
