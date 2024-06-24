"use client";
import React, { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { CalendarDays, EllipsisVertical } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { QRCodeSVG } from "qrcode.react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import CustomButton from "../CustomButton";

type GroupMember = {
  id: string;
  name: string;
  email: string;
  avatarUrl: string;
};

const groupMembers: GroupMember[] = [
  {
    id: "1",
    name: "John Doe",
    email: "john@example.com",
    avatarUrl: "https://via.placeholder.com/200",
  },
  {
    id: "2",
    name: "Jane Smith",
    email: "jane@example.com",
    avatarUrl: "https://via.placeholder.com/200",
  },
  {
    id: "3",
    name: "Mark Johnson",
    email: "mark@example.com",
    avatarUrl: "https://via.placeholder.com/200",
  },
  {
    id: "4",
    name: "Emily Davis",
    email: "emily@example.com",
    avatarUrl: "https://via.placeholder.com/200",
  },
];

const GroupMembers = () => {
  return (
    <>
      <div className="w-full mt-4">
        <h2 className="text-xl text-left text-secondary-color font-bold">
          Members
        </h2>
        <Separator className="my-4" />
      </div>
      <div className="flex flex-row justify-start items-center flex-wrap w-full gap-6">
        {groupMembers.map((member) => (
          <div
            key={member.id}
            className="group-member flex items-center space-x-4 p-4"
          >
            <Avatar>
              <AvatarImage src={member.avatarUrl} alt={member.name} />
              <AvatarFallback>{member.name[0]}</AvatarFallback>
            </Avatar>
            <div>
              <div className="w-full flex flex-row justify-between items-center">
                <div className="font-medium">{member.name}</div>
                <Dialog>
                  <DialogTrigger>
                    <EllipsisVertical
                      className="text-secondary-color"
                      size={20}
                    />
                  </DialogTrigger>
                  <DialogContent>
                    <Tabs defaultValue="qr_code" className="w-full">
                      <TabsList className="grid w-full grid-cols-2">
                        <TabsTrigger value="qr_code">QR Code</TabsTrigger>
                        <TabsTrigger value="users_settings">
                          Settings
                        </TabsTrigger>
                      </TabsList>
                      <TabsContent value="qr_code">
                        <Card>
                          <CardHeader>
                            <CardTitle>QR Code</CardTitle>
                            <CardDescription>
                              Scan the QR code to pay with eSewa.
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
                      <TabsContent value="users_settings">
                        <Card>
                          <CardHeader>
                            <CardTitle>Payment Information</CardTitle>
                            <CardDescription>
                              These are the payment information of the owner.
                            </CardDescription>
                          </CardHeader>
                          <CardContent className="space-y-2">
                            Lorem ipsum dolor sit amet consectetur adipisicing
                            elit. Eum cum libero reiciendis? Reiciendis?
                          </CardContent>
                          <CardFooter>
                          <CustomButton className="bg-red-600">Remove {member.name.split(" ")[0]}</CustomButton>
                          </CardFooter>
                        </Card>
                      </TabsContent>
                    </Tabs>
                  </DialogContent>
                </Dialog>
              </div>
              <div className="text-sm text-gray-500">{member.email}</div>
              <div className="flex items-center pt-2">
                <CalendarDays className="mr-2 h-4 w-4 opacity-70" />{" "}
                <span className="text-xs text-muted-foreground">
                  Joined December 2021
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default GroupMembers;
