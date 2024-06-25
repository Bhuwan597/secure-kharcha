import React from "react";
import ContainerSection from "@/components/partials/ContainerSection";
import Heading from "@/components/custom-components/dashboard/Heading";
import SignInForm from "@/components/forms/SignInForm";

const Page = () => {
  return (
    <>
      <Heading title="Sign in - Secure Kharcha" className="mt-20" />
      <ContainerSection className="mb-20">
        <SignInForm/>
      </ContainerSection>
    </>
  );
};

export default Page;
