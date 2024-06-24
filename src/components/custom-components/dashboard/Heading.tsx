import React from "react";
import BreadCrumbComponent from "./BreadCrumbComponent";
import ContainerSection from "@/components/partials/ContainerSection";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";



const Heading = ({title, className=""}: {title: string, className?:string}) => {
  return (
    <>
    <ContainerSection className={cn("w-full flex flex-row flex-wrap justify-between items-center py-10 md:px-20", className)}>
        <h1 className="font-bold text-lg sm:text-xl md:text-2xl text-secondary-color">{title}</h1>
      <BreadCrumbComponent />
    <Separator orientation="horizontal" className="my-4" />
    </ContainerSection>
    </>
  );
};

export default Heading;
