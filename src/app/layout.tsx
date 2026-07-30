import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Airbnb | Vacation rentals, cabins, beach houses & more",
  description:
    "Find vacation rentals, cabins, beach houses, unique homes and experiences around the world.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full">
      <body className="min-h-full flex flex-col bg-white text-hof">
        {children}
      </body>
    </html>
  );
}
