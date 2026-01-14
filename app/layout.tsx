import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import ClientLayout from '@/components/layout/ClientLayout';

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// NOW THIS WORKS!
export const metadata: Metadata = {
  title: "Mae Compliance - Inspector Portal",
  description: "Official Fire Door Inspection Tool for Mae Compliance Service",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} bg-gray-50 text-slate-900 antialiased`}>
        {/* We wrap the children in our client component that handles the sidebar state */}
        <ClientLayout>
          {children}
        </ClientLayout>
      </body>
    </html>
  );
}