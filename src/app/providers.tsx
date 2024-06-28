"use client"
import { ThemeProvider } from "@/components/theme-provider";
import { AuthContextProvider } from "@/contexts/user.context";
import React from "react";
import {
  QueryClient,
  QueryClientProvider,
  useQuery,
} from "@tanstack/react-query";

export const Providers = ({ children }: { children: React.ReactNode }) => {
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      <AuthContextProvider>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </AuthContextProvider>
    </QueryClientProvider>
  );
};
