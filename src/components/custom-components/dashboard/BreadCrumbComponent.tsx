"use client";
import { usePathname } from "next/navigation";
import React from "react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Slash } from "lucide-react";

interface BreadcrumbInterface {
  name: string;
  href: string;
}

export const generateBreadcrumbs = (path: string) => {
  const segments = path.split("/").filter((segment) => segment);

  const breadcrumbs: BreadcrumbInterface[] = segments.map((segment, index) => {
    const href = "/" + segments.slice(0, index + 1).join("/");
    const name = segment.charAt(0).toUpperCase() + segment.slice(1);

    return { name, href };
  });

  return breadcrumbs;
};

const BreadCrumbComponent = () => {
  const pathname = usePathname();
  const breadcrumbDetails: BreadcrumbInterface[] = generateBreadcrumbs(
    pathname || ""
  );
  return (
    <Breadcrumb>
      <BreadcrumbList>
        {breadcrumbDetails.map((b, index) => {
          return (
            <React.Fragment key={index}>
              <BreadcrumbItem>
                <BreadcrumbLink href={b.href}>{b.name}</BreadcrumbLink>
              </BreadcrumbItem>
              {index !== breadcrumbDetails.length-1 && (
                <BreadcrumbSeparator>
                  <Slash />
                </BreadcrumbSeparator>
              )}
            </React.Fragment>
          );
        })}
      </BreadcrumbList>
    </Breadcrumb>
  );
};

export default BreadCrumbComponent;
