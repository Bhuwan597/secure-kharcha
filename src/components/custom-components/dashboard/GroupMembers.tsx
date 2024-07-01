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
import { UserDetailsInterface, useAuth } from "@/contexts/user.context";

const GroupMembers = ({
  members,
  owner,
}: {
  members: (UserDetailsInterface | null)[] | null;
  owner: UserDetailsInterface | null;
}) => {
  const { userDetails } = useAuth();
  if (!members) return;
  return (
    <>
      <div className="w-full mt-4">
        <h2 className="text-xl text-left text-secondary-color font-bold">
          Members
        </h2>
        <Separator className="my-4" />
      </div>
      <div className="flex flex-row justify-start items-center flex-wrap w-full gap-6">
        {members.map((member) => (
          <div
            key={member?.uid}
            className="group-member flex items-center space-x-4 p-4"
          >
            <Avatar>
              <AvatarImage src={member?.photo} alt={member?.displayName} />
              <AvatarFallback>{member?.firstName}</AvatarFallback>
            </Avatar>
            <div>
              <div className="w-full flex flex-row justify-between items-center">
                <div className="font-medium">{member?.displayName}</div>
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
                                  eSewa_id: `${member?.phoneNumber}`,
                                  name: `${member?.displayName}`,
                                })}
                              />
                            </AspectRatio>
                          </CardContent>
                        </Card>
                      </TabsContent>
                      <TabsContent value="users_settings">
                        <Card>
                          <CardHeader>
                            <CardTitle>Settings</CardTitle>
                          </CardHeader>
                          <CardFooter>
                            {member?.uid === userDetails?.uid ? (
                              <CustomButton className="bg-red-600">
                                Leave this group
                              </CustomButton>
                            ) : (
                              <>
                                {userDetails?.uid === owner?.uid && (
                                  <CustomButton className="bg-red-600">
                                    Remove {member?.firstName}
                                  </CustomButton>
                                )}
                              </>
                            )}
                          </CardFooter>
                        </Card>
                      </TabsContent>
                    </Tabs>
                  </DialogContent>
                </Dialog>
              </div>
              <div className="text-sm text-gray-500">{member?.email}</div>
              <div className="flex items-center pt-2">
                <CalendarDays className="mr-2 h-4 w-4 opacity-70" />{" "}
                <span className="text-xs text-muted-foreground">
                  Joined through{" "}
                  {member?.provider === "password" ? "Email" : "Google"}
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
