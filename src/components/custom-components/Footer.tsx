import React from "react";
import ContainerSection from "../partials/ContainerSection";
import Link from "next/link";

const Footer = () => {
  return (
    <footer className="bg-primary-color text-gray-300 py-8">
      <ContainerSection>
        <div className="flex flex-col items-start gap-4 md:flex-row md:justify-between justify-center md:items-center">
          <div className="">
            <Link href={"/"} className="text-xl font-bold">Secure Kharcha</Link>
            <p className="mt-2 text-sm">Manage group expenses effortlessly.</p>
          </div>
          <div className="">
            <p>&copy; {new Date().getFullYear()} Secure Kharcha. All rights reserved.</p>
            <Link className="text-center" href={"https://facebook.com/bhuwanacharya.998"}>Bhuwan Acharya Upadhyaya</Link>
          </div>
        </div>
      </ContainerSection>
    </footer>
  );
};

export default Footer;
