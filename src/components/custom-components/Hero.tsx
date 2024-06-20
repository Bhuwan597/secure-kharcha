import React from "react";
import ContainerSection from "../partials/ContainerSection";
import Image from "next/image";
import { Button } from "../ui/button";
import Link from "next/link";
import { MoveRight } from "lucide-react";

const heroDetails = {
  heading: "Most Secure Expense Manager",
  description:
    "Enables users to track, split, and settle expenses while ensuring the highest level of data security.",
};

const Hero = () => {
  return (
    <ContainerSection className="grid grid-cols-1 md:grid-cols-2 py-32 gap-10 text-center">
      <div className="flex flex-col items-center justify-center gap-10">
        <h1 className="text-3xl md:text-5xl font-bold text-secondary-color">
          {heroDetails.heading}
        </h1>
        <h2 className="text-xl text-primary-color text-opacity-70">
          {heroDetails.description}
        </h2>
        <Button variant={"default"} className="bg-primary-color text-white hover:bg-opacity-85">
          <Link href={"/sign-up"} className="w-full flex gap-2 items-center">
            Get Started with free account! <MoveRight />
          </Link>
        </Button>
      </div>
      <div className="flex justify-center">
        <Image
          src={"/images/main.png"}
          width={550}
          height={800}
          alt="people splitting bill image"
          className="rounded-md"
        />
      </div>
    </ContainerSection>
  );
};

export default Hero;
