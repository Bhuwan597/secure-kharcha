import React from "react";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";

interface CustomButtonProps extends React.HTMLAttributes<HTMLButtonElement> {
    // You can add additional props here if needed
    children: React.ReactNode;
  }

const CustomButton : React.FC<CustomButtonProps> = ({ className, children, ...props }) => {
  return (
    <Button {...props} className={cn("bg-secondary-color text-white", className )} variant={"default"}>
      {children}
    </Button>
  );
};

export default CustomButton;
