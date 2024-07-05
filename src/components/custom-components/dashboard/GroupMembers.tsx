"use client";
import React, { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { CalendarDays, EllipsisVertical } from "lucide-react";
import { QRCodeSVG } from "qrcode.react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
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
import { useAuth } from "@/contexts/user.context";
import { GroupInterface } from "@/types/group.types";

const GroupMembers = ({
  group
}: {
  group: GroupInterface | null
}) => {
  const { userDetails } = useAuth();
  if (!group || !group.members) return;
  const handleRemoveUserClick = async (userId?: string) => {};
  return (
    <>
      <div className="w-full mt-4">
        <h2 className="text-xl text-left text-secondary-color font-bold">
          Members
        </h2>
        <Separator className="my-4" />
      </div>
      <div className="flex flex-row justify-start items-center flex-wrap w-full gap-6">
        {group.members.map((member) => (
          <div
            key={member.user?._id}
            className="group-member flex items-center space-x-4 p-4"
          >
            <Avatar className="h-20 w-20">
              <AvatarImage src={member.user?.photo || "/images/default-user.svg"} alt={member.user?.displayName} />
              <AvatarFallback>{member.user?.firstName}</AvatarFallback>
            </Avatar>
            <div>
              <div className="w-full flex flex-row justify-between items-center">
                <div className="font-medium">{member.user?.displayName}</div>
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
                                  eSewa_id: `${member.user?.eSewa}`,
                                  name: `${member.user?.displayName}`,
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
                            {member.user?._id === userDetails?._id ? (
                              <CustomButton
                                onClick={() =>
                                  handleRemoveUserClick(member.user?._id)
                                }
                                className="bg-red-600"
                              >
                                Leave this group
                              </CustomButton>
                            ) : (
                              <>
                                {userDetails?._id === group.owner?._id && (
                                  <CustomButton
                                    onClick={() =>
                                      handleRemoveUserClick(member.user?._id)
                                    }
                                    className="bg-red-600"
                                  >
                                    Remove {member.user?.firstName}
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
              <div className="text-sm text-gray-500">{member.user?.email}</div>
              <div className="flex items-center pt-2">
                <CalendarDays className="mr-2 h-4 w-4 opacity-70" />{" "}
                <span className="text-xs text-muted-foreground">
                  Joined through{" "}
                  {member.user?.provider === "password" ? "Email" : "Google"}
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
