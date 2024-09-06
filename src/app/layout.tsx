import Navbar from "@/app/_components/navbar";
import { cn } from "@/lib/utils";
import "@/styles/globals.css";

import { type Metadata } from "next";
import { Bricolage_Grotesque } from "next/font/google";
import { Toaster } from "sonner";

const bricolageGrotesque = Bricolage_Grotesque({
  weight: ["500", "700", "800"],
  subsets: ["latin"],
  variable: "--display-font",
});

export const metadata: Metadata = {
  title: "Teapme",
  description: "Tipping for folks who ain't fancy coffee.",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={cn(bricolageGrotesque.className)}>
      <body className="flex h-screen flex-col bg-gray-50">
        <Navbar />
        <div className="w-full max-w-4xl self-center py-10">{children}</div>
      </body>
      <Toaster position="bottom-center" richColors />
    </html>
  );
}
