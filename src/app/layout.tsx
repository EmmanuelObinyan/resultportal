import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Senate System - Mountain Top University",
  description: "Official Senate Result Verification Portal",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}
