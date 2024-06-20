"use client";
import Link from "next/link";
import React from "react";
import { LockIcon, MenuIcon, User } from "lucide-react";
import { ModeToggle } from "../partials/theme-button";
import MappingContainer from "../partials/MappingContainer";
import { Button } from "../ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "../ui/navigation-menu";

interface NavLinksInterface {
  title: string;
  path: string;
  description?: string;
  subLinks?: { title: string; path: string; description?: string }[];
}

const navLinks: NavLinksInterface[] = [
  { title: "Home", path: "/" },
  {
    title: "Services",
    path: "#",
    subLinks: [
      {
        title: "Bill Splitter",
        path: "/splitter",
      }
    ],
  },
  { title: "About", path: "/about" },
  { title: "Feedback", path: "/feedback" },
];

const Navbar = () => {
  return (
    <nav className="fixed top-0 w-full flex flex-row items-center justify-between p-4 border-b z-50 bg-light-color dark:bg-dark-color">
      <Link
        href={"/"}
        className="text-primary-color flex flex-row gap-2 items-center"
      >
        <LockIcon /> <h2 className="text-xl font-bold">Secure Kharcha</h2>
      </Link>
      <div className="hidden md:flex flex-row items-center justify-center gap-6">
        {navLinks.map((l, index) => (
          <MappingContainer index={index}>
            <Link href={l.path} className="font-semibold">
              {l.title}
            </Link>
          </MappingContainer>
        ))}
      </div>
      <div className="hidden md:flex flex-row items-center gap-2 w-fit">
        <Button className="bg-secondary-color text-white hover:bg-opacity-85">
          <Link href={"/sign-in"} className="flex flex-row gap-2">
            <User size={18} /> Sign in
          </Link>
        </Button>
        <ModeToggle />
      </div>

      <Sheet>
        <SheetTrigger className="block md:hidden">
          <MenuIcon size={30} className="text-secondary-color" />
        </SheetTrigger>
        <SheetContent
          side={"left"}
          className="bg-light-color text-dark-color dark:text-light-color dark:bg-dark-color border-r-slate-500"
        >
          <SheetHeader>
            <SheetTitle className="flex flex-row justify-between items-center py-6 pr-6">
              Navigation Menu <ModeToggle />
            </SheetTitle>
            <SheetDescription className="flex flex-col gap-6 items-start justify-start font-semibold">
              <NavigationMenu>
                <NavigationMenuList className="flex flex-col gap-6 justify-start items-start">
                  {navLinks.map((l, index) => {
                    if (l.subLinks) {
                      return (
                        <MappingContainer index={index}>
                          <NavigationMenuItem className="flex flex-col gap-4 justify-start items-start">
                            {l.title}
                            <div className="flex flex-col gap-4">
                              {l.subLinks?.map((s, index) => {
                                return (
                                  <MappingContainer index={index} >
                                    <Link className="border-l-2 ml-2 pl-2" href={s.path}>{s.title}</Link>
                                  </MappingContainer>
                                );
                              })}
                            </div>
                          </NavigationMenuItem>
                        </MappingContainer>
                      );
                    }
                    return (
                      <MappingContainer index={index}>
                        <NavigationMenuItem>
                          <Link href={l.path}>{l.title}</Link>
                        </NavigationMenuItem>
                      </MappingContainer>
                    );
                  })}
                </NavigationMenuList>
              </NavigationMenu>
              <Button className="bg-secondary-color text-white">
                <Link href={"/sign-in"} className="flex flex-row gap-2">
                  <User size={18} /> Sign in
                </Link>
              </Button>
              <Button
                className="border-primary-color hover:bg-primary-color hover:text-white"
                variant={"outline"}
              >
                <Link href={"/sign-in"} className="flex flex-row gap-2">
                  <User size={18} /> Create free account
                </Link>
              </Button>
            </SheetDescription>
          </SheetHeader>
        </SheetContent>
      </Sheet>
    </nav>
  );
};

export default Navbar;
