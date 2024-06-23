import Heading from "@/components/custom-components/dashboard/Heading";
import ContainerSection from "@/components/partials/ContainerSection";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CameraIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const Page = () => {
  return (
    <>
      <Heading title="Family Vacation" />
      <ContainerSection>
        <div className="w-full relative">
          <AspectRatio ratio={16 / 9}>
            <Image
              fill
              src="/images/test.jpg"
              alt="Image"
              className="rounded-md object-cover"
            />
          </AspectRatio>
          <div className="absolute bottom-2 right-2 grid w-fit items-center gap-1.5">
            <Label htmlFor="picture" className="p-2 rounded-lg bg-secondary-color w-fit text-white ring-2 cursor-pointer flex flex-row justify-center items-center gap-2">
                <CameraIcon size={25}/> <span className="hidden sm:inline">Update</span>
            </Label>
            <Input id="picture" type="file" className="hidden"/>
          </div>
        </div>
      </ContainerSection>
      <ContainerSection className="flex flex-col justify-center items-center gap-4 my-10">
              <h3 className="mb-1.5 text-2xl font-semibold text-black dark:text-white">
                Family Vacation
              </h3>
              <p className="font-medium">Created by Bhuwan Acharya Upadhyaya</p>
              <p className="text-sm">Yesterday</p>
              <div className="mx-auto mb-5.5 mt-4.5 grid max-w-94 grid-cols-3 rounded-md border border-stroke py-2.5 shadow-1 dark:border-strokedark dark:bg-[#37404F]">
                <div className="flex flex-col items-center justify-center gap-1 border-r border-stroke px-4 dark:border-strokedark xsm:flex-row">
                  <span className="font-semibold text-black dark:text-white">
                    Rs. 25945
                  </span>
                  <span className="text-sm">Expense</span>
                </div>
                <div className="flex flex-col items-center justify-center gap-1 border-r border-stroke px-4 dark:border-strokedark xsm:flex-row">
                  <span className="font-semibold text-black dark:text-white">
                    14
                  </span>
                  <span className="text-sm">Transactions</span>
                </div>
                <div className="flex flex-col items-center justify-center gap-1 px-4 xsm:flex-row">
                  <span className="font-semibold text-black dark:text-white">
                    8
                  </span>
                  <span className="text-sm">Members</span>
                </div>
              </div>

              <div className="mx-auto max-w-180">
                <h4 className="font-semibold text-black dark:text-white">
                  About the group
                </h4>
                <p className="mt-4.5">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Pellentesque posuere fermentum urna, eu condimentum mauris
                  tempus ut. Donec fermentum blandit aliquet. Etiam dictum
                  dapibus ultricies. Sed vel aliquet libero. Nunc a augue
                  fermentum, pharetra ligula sed, aliquam lacus.
                </p>
              </div>
            </ContainerSection>
    </>
  );
};

export default Page;
