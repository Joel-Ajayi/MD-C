import { Roboto } from "next/font/google";
import { Metadata } from "next";
import StoreLayout from "./StoreLayout";
import TryAuth from "./TryAuth";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["100", "300", "400", "500", "700", "900"],
});

export const metadata: Metadata = {
  title: "MD-Care",
  description: "Find the nearest clinic or order an ambulance for your pet",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={roboto.className}>
        <StoreLayout>
          <TryAuth>{children}</TryAuth>
        </StoreLayout>
      </body>
    </html>
  );
}
