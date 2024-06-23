"use client";
import Link from "next/link";
import React, { useState } from "react";
import { LockIcon, MenuIcon, User } from "lucide-react";
import { ModeToggle } from "../partials/theme-button";
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
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "../ui/navigation-menu";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";
import CustomButton from "./CustomButton";

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
        title: "Expense Splitter",
        path: "/splitter",
        description:
          "The Splitter service in Secure Kharcha simplifies expense splitting among groups, ensuring accurate calculations and transparent tracking. Effortlessly manage shared expenses with real-time updates and easy settlement options.",
      },
      {
        title: "Expense Tracker",
        path: "/expense-tracker",
        description:
          "The Expense Tracker service in Secure Kharcha helps you manage your finances with ease. Track your expenses, categorize transactions, and gain insights into your spending habits.",
      },
    ],
  },
  { title: "About", path: "/about" },
  { title: "Feedback", path: "/feedback" },
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  if(pathname.startsWith("/dashboard")){
    return;
  }
  return (
    <nav className="fixed top-0 w-full flex flex-row items-center justify-between p-4 border-b z-50 bg-light-color dark:bg-dark-color">
      <Link
        href={"/"}
        className="text-primary-color flex flex-row gap-2 items-center"
      >
        <LockIcon size={25} className="text-secondary-color" />
        <h2 className="text-xl font-bold">Secure Kharcha</h2>
      </Link>

      <div className="hidden md:flex flex-row items-center justify-center gap-6">
        {navLinks.map((l, index) => {
          if (l.subLinks) {
            return (
              <div key={index}>
                <NavigationMenu orientation="vertical">
                  <NavigationMenuList>
                    <NavigationMenuItem>
                      <NavigationMenuTrigger className="font-semibold text-md cursor-pointer">
                        {l.title}
                      </NavigationMenuTrigger>
                      <NavigationMenuContent className="bg-light-color text-dark-color dark:bg-dark-color dark:text-light-color">
                        <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] ">
                          {l.subLinks.map((s, index) => (
                            <div key={index}>
                              <ListItem title={s.title} href={s.path}>
                                {s.description}
                              </ListItem>
                            </div>
                          ))}
                        </ul>
                      </NavigationMenuContent>
                    </NavigationMenuItem>
                  </NavigationMenuList>
                </NavigationMenu>
              </div>
            );
          }
          return (
            <div key={index}>
              <NavigationMenu>
                <NavigationMenuList>
                  <NavigationMenuItem>
                    <Link href={l.path} className="font-semibold">
                      {l.title}
                    </Link>
                  </NavigationMenuItem>
                </NavigationMenuList>
              </NavigationMenu>
            </div>
          );
        })}
      </div>
      <div className="hidden md:flex flex-row items-center gap-2 w-fit">
        <CustomButton className="bg-secondary-color">
          <Link href={"/sign-in"} className="flex flex-row gap-2">
            <User size={18} /> Sign in
          </Link>
        </CustomButton>
        <ModeToggle />
      </div>

      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetTrigger
          onClick={() => setIsOpen(true)}
          className="block md:hidden"
        >
          <MenuIcon size={30} className="text-secondary-color" />
        </SheetTrigger>
        <SheetContent
          side={"left"}
          className=""
        >
          <SheetHeader>
            <SheetTitle className="flex flex-row justify-between items-center py-6 pr-6">
              <Link
                href={"/"}
                className="text-primary-color flex flex-row gap-2 items-center"
              >
                <LockIcon size={25} className="text-secondary-color" />
                <h2 className="text-xl font-bold">Secure Kharcha</h2>
              </Link>
              <ModeToggle />
            </SheetTitle>
            <SheetDescription className="flex flex-col gap-6 items-start justify-start font-semibold">
              <NavigationMenu className="w-full">
                <NavigationMenuList className="flex flex-col gap-6 justify-start items-start w-full">
                  {navLinks.map((l, index) => {
                    if (l.subLinks) {
                      return (
                        <div key={index}>
                          <NavigationMenuItem className="flex flex-col gap-4 justify-start items-start w-full">
                            {l.title}
                            <div className="flex flex-col gap-4 pl-4 w-full">
                              {l.subLinks?.map((s, index) => {
                                return (
                                  <div key={index}>
                                    <Link
                                      onClick={() => setIsOpen(false)}
                                      className="border-l-2 pl-2"
                                      href={s.path}
                                    >
                                      {s.title}
                                    </Link>
                                  </div>
                                );
                              })}
                            </div>
                          </NavigationMenuItem>
                        </div>
                      );
                    }
                    return (
                      <div key={index}>
                        <NavigationMenuItem>
                          <Link onClick={() => setIsOpen(false)} href={l.path}>
                            {l.title}
                          </Link>
                        </NavigationMenuItem>
                      </div>
                    );
                  })}
                </NavigationMenuList>
              </NavigationMenu>
              <CustomButton className="bg-secondary-color">
                <Link onClick={()=>setIsOpen(false)} href={"/sign-in"} className="flex flex-row gap-2">
                  <User size={18} /> Sign in
                </Link>
              </CustomButton>
              <CustomButton
                className="bg-primary-color"
              >
                <Link onClick={()=>setIsOpen(false)} href={"/sign-in"} className="flex flex-row gap-2">
                  <User size={18} /> Create free account
                </Link>
              </CustomButton>
            </SheetDescription>
          </SheetHeader>
        </SheetContent>
      </Sheet>
    </nav>
  );
};

const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  );
});
ListItem.displayName = "ListItem";
export default Navbar;
