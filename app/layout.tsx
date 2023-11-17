import React from "react";
import "./globals.css";
import type { Metadata } from "next";
import { Roboto_Condensed } from "next/font/google";
import NavBar from "./components/nav/NavBar";
import Footer from "./components/footer/Footer";
import CartProvider from "@/providers/CartProvider";
import { Toaster } from "react-hot-toast";

const roboto = Roboto_Condensed({
  subsets: ["latin"],
  weight: ["400", "700"],
});

export const metadata: Metadata = {
  title: "ShopSimply.com | Simplify Your Shopping Experience!",
  description: " Your Online Shopping Destination",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${roboto.className} text-slate-500`}>
        <Toaster
          toastOptions={{
            position: "top-right",
          }}
        />
        <CartProvider>
          <div className="flex flex-col min-h-screen">
            <NavBar />
            <main className="flex-grow"> {children}</main>
            <Footer />
          </div>
        </CartProvider>
      </body>
    </html>
  );
}
