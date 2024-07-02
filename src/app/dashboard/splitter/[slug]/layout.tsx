"use client"
import { GroupSlugProvider } from "@/contexts/group-slug.context";
import React from "react";

const Layout = ({ children, params }: { children: React.ReactNode, params: {slug: string} }) => {
  return <GroupSlugProvider slug={params.slug}>{children}</GroupSlugProvider>;
};

export default Layout;
