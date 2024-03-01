import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import NavBar from "../component/nav/navBar";
import Footer from "@/component/footer/footer";
import "material-icons/iconfont/material-icons.css";
import SessionProvider from '@/app/SessionProvider'

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "2 Hand's Product",
  description: "Generated by 2 Hand's Product",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (

      <html lang="en">
        <body className={inter.className}>
          <SessionProvider>
            <div className="sticky top-0 z-50">
              <NavBar />
            </div>
            <main className="h-full bg-base-200 min-h-screen pt-5">
              {children}
            </main>
            <Footer />
          </SessionProvider>
        </body>
      </html>
  );
}
