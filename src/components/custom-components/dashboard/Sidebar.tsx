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
import {
  BellDot,
  BellDotIcon,
  ChevronDown,
  Divide,
  LockIcon,
  MenuIcon,
  MoveDown,
  TrendingUp,
} from "lucide-react";
import Link from "next/link";
import React, { useState } from "react";


const dashboardLinks = [
    {title: "Expense Splitter", path: "/dashboard/splitter", Icon: Divide},
    {title: "Expense Tracker", path: "/dashboard/tracker", Icon: TrendingUp},
]

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <nav className="p-4 flex flex-row justify-between items-center">
        <div className="flex flex-row gap-4">
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger onClick={() => setIsOpen(true)}>
              <MenuIcon size={30} className="text-secondary-color" />
            </SheetTrigger>
            <SheetContent
              side={"left"}
              className=""
            >
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
                          {dashboardLinks.map((d, index)=>{
                            return (
                              <Link href={d.path} onClick={()=>setIsOpen(false)} className="flex flex-row justify-start items-center gap-6 text-lg font-semibold p-2 hover:bg-slate-100 dark:hover:bg-slate-900 w-full rounded-md" key={index + 1}>
                                  {<d.Icon className="text-secondary-color" size={25}/>}
                                  {d.title}
                              </Link>
                            )
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
            <div className="flex-col gap-1 items-end hidden md:flex">
              <p className="font-bold text-sm">Bhuwan Acharya Upadhyaya</p>
              <p className="text-xs">v1acharya34@gmail.com</p>
            </div>

            <DropdownMenu>
              <DropdownMenuTrigger className="flex flex-row gap-2 items-center justify-center">
                <Avatar>
                  <AvatarImage src="https://github.com/shadcn.png" />
                  <AvatarFallback>BU</AvatarFallback>
                </Avatar>
                <ChevronDown size={15} />
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Profile</DropdownMenuItem>
                <DropdownMenuItem>Logout</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Sidebar;