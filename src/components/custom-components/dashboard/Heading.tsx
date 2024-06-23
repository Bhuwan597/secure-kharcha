import React from "react";
import BreadCrumbComponent from "./BreadCrumbComponent";
import ContainerSection from "@/components/partials/ContainerSection";
import { Separator } from "@/components/ui/separator";



const Heading = ({title}: {title: string}) => {
  return (
    <>
    <ContainerSection className="w-full flex flex-row flex-wrap justify-between items-center py-10 md:px-20">
        <h1 className="font-bold text-lg sm:text-xl md:text-2xl text-secondary-color">{title}</h1>
      <BreadCrumbComponent />
    <Separator orientation="horizontal" className="my-4" />
    </ContainerSection>
    </>
  );
};

export default Heading;
