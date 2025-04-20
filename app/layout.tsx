import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { NavBar } from "./components/NavBar";
import { Footer } from "./components/Footer";
import { ServiceProvider } from "./context/ServiceContext";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
  title: "Top Grid Eco Solutions",
  description: "Top Grid Eco Solutions Website showing services provided",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} flex flex-col min-h-screen`}>
        <ServiceProvider>
          <NavBar />
          <main className="flex-grow">{children}</main>
          <Footer />
        </ServiceProvider>
      </body>
    </html>
  );
}