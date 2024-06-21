import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/toaster";
import Navbar from "@/components/custom-components/Navbar";

export const metadata: Metadata = {
  title: "Home - Secure Kharcha",
  description: "Secure Kharcha is designed for efficient and secure expense management, ideal for groups sharing expenses. It enables users to track, split, and settle expenses while ensuring the highest level of data security.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Navbar/>
          {children}
          <Toaster/>
        </ThemeProvider>
      </body>
    </html>
  );
}