import { cn } from "@/lib/utils";
import React from "react";

interface ContainerSectionProps
  extends React.HtmlHTMLAttributes<HTMLSelectElement> {
  children?: React.ReactNode;
}

const ContainerSection: React.FC<ContainerSectionProps> = ({
  className,
  children,
  ...props
}) => {
  return <section className={cn("max-h-screen px-10 md:px-20 lg:px-32", className)} {...props}>{children}</section>;
};

export default ContainerSection;
