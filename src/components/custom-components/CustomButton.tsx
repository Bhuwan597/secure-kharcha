import React, { ButtonHTMLAttributes } from "react";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";
import ButtonLoader from "../partials/ButtonLoader";

export enum buttonVariant {
  link = "link",
  default= "default",
  destructive = "destructive",
  outline= "outline",
  secondary = "secondary",
  ghost = "ghost"
}

interface CustomButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  // You can add additional props here if needed
  children: React.ReactNode;
  variant?: buttonVariant;
  loading?: boolean;
}

const CustomButton: React.FC<CustomButtonProps> = ({ className, children, loading, ...props }) => {
  return (
    <Button
      {...props}
      disabled={loading}
      className={cn(
        "flex flex-row items-center justify-center gap-2 rounded-md text-light-color dark:hover:text-dark-color",
        className
      )}
      variant={props.variant}
    >
      {loading && <ButtonLoader/>}
      {children}
    </Button>
  );
};

export default CustomButton;
