import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Providers from "@/providers";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Toaster } from "react-hot-toast";
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Elite Luxury Limousine",
  applicationName: "Elite Luxury Limousine",
  referrer: "origin-when-cross-origin",
  category: "service",
  description: `We are a family and locally owned business deeply rooted in tradition serving the Chicago and Milwaukee markets. Where
  integrity and reliability resonate throughout the organization. We look forward to you or your organization joining our family of
  satisfied clients. Professional Chauffeur Services for Seamless Journeys! Book our services and enjoy a stylish and safe ride, regardless of your destination. We provide reliable and experienced chauffeurs ready to meet you at the airport or serve as your personal driver. With a modern fleet, high-quality service, and affordable rates, entrust your journey to professionals and make every ride a hassle-free experience!`,
  metadataBase: new URL("https://alexlimo.vercel.app/"),
  authors: [
    { name: "Alex" },
    { name: "Alex", url: "https://alexlimo.vercel.app/" },
  ],
  openGraph: {
    title: "Elite Luxury Limo Order Ride",
    description:
      "Professional Chauffeur Services for Seamless Journeys! Book our services and enjoy a stylish and safe ride, regardless of your destination. We provide reliable and experienced chauffeurs ready to meet you at the airport or serve as your personal driver. With a modern fleet, high-quality service, and affordable rates, entrust your journey to professionals and make every ride a hassle-free experience!",
    url: "https://alexlimo.vercel.app/",
    siteName: "ELite Luxury Limousine",
    images: [
      {
        url: "https://res.cloudinary.com/dxvf93ovn/image/upload/v1710474865/alexlimoicons/favicon_et4rd2.ico",
        width: 800,
        height: 600,
      },
      {
        url: "https://res.cloudinary.com/dxvf93ovn/image/upload/v1710474865/alexlimoicons/favicon_et4rd2.ico",
        width: 1800,
        height: 1600,
        alt: "Alex limo",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  creator: "Askar Zhaanbaev",
  publisher: "Alex Limo",
  alternates: {
    canonical: "/",
    languages: {
      "en-US": "/en-US",
    },
  },
  formatDetection: {
    email: false,
    address: false,
    telephone: true,
  },
  keywords: [
    "Transportation Services",
    "Airport Transportation",
    "Shuttle Service",
    "Car Service",
    "Party Bus",
    "Prom Limousine",
    "Wine Tours",
    "Limo Service",
    "Executive Transfers",
    "Limousine Service",
    "Wedding Limousine",
    "Taxi",
    "Chicago party bus",
    "party bus",
    "Chicago limo",
    "limo",
    "limousine",
    "black car",
    "Chicago black car",
    "suburbs limo",
    "suburbs limousine",
    "suburbs black car",
    "sprinter vans",
    "executive vans",
    "stretch limo",
    "stretch limousine",
    "bus",
    "Chicago bus",
    "Chicago stretch limo",
    "Chicago car service",
    "Suburban car service",
    "O’Hare car service",
    "midway car service",
    "executive car service",
    "Chicago limousine",
    "suburban limousine",
    "Barrington car service",
    "lake Barrington car service",
    "Inverness car service",
    "deer park car service",
    "Long Grove car service",
    "Palatine car service",
    "Wilmette car service",
    "Kenilworth car service",
    "Glencoe car service",
    "Winnetka car service",
    "Lake forest car service",
    "Highland Park car service",
    "Lake Bluff car service",
    "Hawthorn Woods car service",
    "Kildeer car service",
    "Chicago black car service",
    "Chicago Party bus",
    "Chicago vans",
    "Chicago Stretch",
    "Chicago wedding car service",
    "Corporate car service Chicago",
    "Hinsdale car service",
    "Elmhurst car service",
    "Chicago sporting events car service",
    "Chicago sorting event limousine",
    "Glen Ellyn car service",
    "Antioch car service",
    "Indiana to O’Hare car service",
    "Wisconsin to O’Hare car service",
  ],
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: "https://res.cloudinary.com/dxvf93ovn/image/upload/v1710474865/alexlimoicons/favicon_et4rd2.ico",
    shortcut:
      "https://res.cloudinary.com/dxvf93ovn/image/upload/v1710474865/alexlimoicons/favicon_et4rd2.ico",
    apple:
      "https://res.cloudinary.com/dxvf93ovn/image/upload/v1710474865/alexlimoicons/favicon_et4rd2.ico",
    other: {
      rel: "https://res.cloudinary.com/dxvf93ovn/image/upload/v1710474865/alexlimoicons/favicon_et4rd2.ico",
      url: "https://res.cloudinary.com/dxvf93ovn/image/upload/v1710474865/alexlimoicons/favicon_et4rd2.ico",
    },
  },
};
export const viewport: Viewport = {
  themeColor: "white",
  initialScale: 1,
  userScalable: true,
  colorScheme: "dark",
};
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head></head>
      <body className={inter.className}>
        <Providers>
          <Header />
          <main>{children}</main>
          <Footer />
          <Toaster
            position="top-center"
            reverseOrder={false}
            toastOptions={{
              className: "!bg-slate-700 !text-white",
            }}
          />
        </Providers>
      </body>
    </html>
  );
}
