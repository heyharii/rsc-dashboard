import "@/app/globals.css";
import { Inter as FontSans } from "next/font/google";

import { classNames } from "@/helpers/utils";
import Header from "@/components/header";
import HeaderSidebar from "@/components/header-sidebar";
interface DashboardLayoutProps {
  children?: React.ReactNode;
}

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

export default async function DashboardLayout({
  children,
}: DashboardLayoutProps) {
  return (  
    <html lang="en" suppressHydrationWarning>
      <head />
      <body
        className={classNames(
          "min-h-screen bg-white font-sans antialiased",
          fontSans.variable
        )}
      > 
        <HeaderSidebar />
        <main className="lg:pl-64 py-4 sm:py-6 lg:py-8">
          <div className="px-4 sm:px-6 lg:px-8">
            {children}
          </div>
        </main>
      </body>
    </html>
  );
}
