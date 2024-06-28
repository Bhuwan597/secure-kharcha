"use client";
import { ModeToggle } from "@/components/partials/theme-button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { auth } from "@/config/firebase.config";
import { signOut } from "firebase/auth";
import {
  BellDot,
  BellDotIcon,
  ChevronDown,
  Divide,
  Loader2,
  LockIcon,
  MenuIcon,
  MoveDown,
  TrendingUp,
} from "lucide-react";
import Link from "next/link";
import React, { useState } from "react";
import CustomButton from "../CustomButton";
import { useRouter } from "next/navigation";
import { toast } from "@/components/ui/use-toast";
import { useAuth } from "@/contexts/user.context";

const dashboardLinks = [
  { title: "Expense Splitter", path: "/dashboard/splitter", Icon: Divide },
  { title: "Expense Tracker", path: "/dashboard/tracker", Icon: TrendingUp },
];

const Sidebar = () => {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const {userDetails} = useAuth()
  const [logoutLoading, setLogoutLoading] = useState(false);
  const handleLogout = async () => {
    setLogoutLoading(true);
    signOut(auth)
      .then(() => {
        setLogoutLoading(false);
        router.push("/sign-in");
      })
      .catch((error: any) => {
        setLogoutLoading(false)
        toast({
          title: "Error.",
          description: error.message,
        });
      });
  };
  return (
    <>
      <nav className="p-4 flex flex-row justify-between items-center">
        <div className="flex flex-row gap-4">
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger onClick={() => setIsOpen(true)}>
              <MenuIcon size={30} className="text-secondary-color" />
            </SheetTrigger>
            <SheetContent side={"left"} className="">
              <SheetHeader>
                <SheetTitle>
                  <Link
                    href={"/dashboard"}
                    className="text-primary-color flex flex-row gap-2 items-center"
                  >
                    <LockIcon size={25} className="text-secondary-color" />
                    <h2 className="text-xl font-bold">Dashboard</h2>
                  </Link>
                </SheetTitle>
                <SheetDescription>
                  <div className="flex flex-col justify-center items-start gap-4 my-10">
                    {dashboardLinks.map((d, index) => {
                      return (
                        <Link
                          href={d.path}
                          onClick={() => setIsOpen(false)}
                          className="flex flex-row justify-start items-center gap-6 text-lg font-semibold p-2 hover:bg-slate-100 dark:hover:bg-slate-900 w-full rounded-md"
                          key={index + 1}
                        >
                          {
                            <d.Icon
                              className="text-secondary-color"
                              size={25}
                            />
                          }
                          {d.title}
                        </Link>
                      );
                    })}
                  </div>
                </SheetDescription>
              </SheetHeader>
            </SheetContent>
          </Sheet>

          <Link
            href={"/dashboard"}
            className="text-primary-color flex flex-row gap-2 items-center"
          >
            <h2 className="text-lg md:text-xl font-bold">Dashboard</h2>
          </Link>
        </div>
        <div className="flex flex-row-reverse gap-4 items-center justify-end">
          <ModeToggle />
          <Button
            variant={"default"}
            size={"icon"}
            className="bg-slate-100 text-secondary-color hover:bg-opacity-60 hover:delay-100 ease-in-out transition-opacity"
          >
            <BellDotIcon size={22} />
          </Button>
          <div className="flex flex-row gap-4">
                {userDetails && (
                  <>
                    <div className="flex-col gap-1 items-end hidden md:flex">
                      <p className="font-bold text-sm">{userDetails.displayName}</p>
                      <p className="text-xs">{userDetails.email}</p>
                    </div>

                    <DropdownMenu>
                      <DropdownMenuTrigger className="flex flex-row gap-2 items-center justify-center">
                        <Avatar>
                          <AvatarImage src={userDetails.photo || ""} />
                          <AvatarFallback>{userDetails.displayName}</AvatarFallback>
                        </Avatar>
                        <ChevronDown size={15} />
                      </DropdownMenuTrigger>
                      <DropdownMenuContent>
                        <DropdownMenuLabel>My Account</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="p-0 my-1">
                          <CustomButton className="w-full bg-primary-color">
                            Profile
                          </CustomButton>
                        </DropdownMenuItem>
                        <DropdownMenuItem className="p-0 my-1">
                          <CustomButton
                            className="w-full bg-secondary-color"
                            onClick={handleLogout}
                            loading={logoutLoading}
                          >
                            Logout
                          </CustomButton>
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </>
                )}
              
          </div>
        </div>
      </nav>
    </>
  );
};

export default Sidebar;
