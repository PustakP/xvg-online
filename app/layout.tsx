import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Arimo } from 'next/font/google'
import { Rubik } from 'next/font/google'

const arimo = Arimo({
  subsets: ['latin'],
  display: 'swap',
})

const rubik = Rubik({
  subsets: ['latin'],
  display: 'swap',
})

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "xvg-online",
  description: "online tool to make xvg usable",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
