import React, { ButtonHTMLAttributes } from "react";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";

interface CustomButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  // You can add additional props here if needed
  children: React.ReactNode;
}

const CustomButton: React.FC<CustomButtonProps> = ({ className, children, ...props }) => {
  return (
    <Button
      {...props}
      className={cn(
        "flex flex-row items-center justify-center rounded-md text-light-color dark:hover:text-dark-color",
        className
      )}
      variant={"default"}
    >
      {children}
    </Button>
  );
};

export default CustomButton;
