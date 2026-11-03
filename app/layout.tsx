import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import './globals.css'

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Jenkins & Sons | Tree Removal & Tree Care in Virginia",
  description:
    "Jenkins & Sons provides professional tree removal, tree trimming, pruning, and emergency tree services in Fredericksburg, VA and surrounding counties. Contact us for a free estimate.",

  keywords: [
    "tree removal Fredericksburg VA",
    "tree trimming Virginia",
    "tree service near me",
    "emergency tree removal",
    "Jenkins and Sons",
  ],

  openGraph: {
    title: "Jenkins & Sons | Professional Tree Care",
    description:
      "Professional tree removal and outdoor services. Get your free estimate today!",
    siteName: "Jenkins & Sons",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <meta name="Tree work landsacpe" content="culpepper, virginia based tree work and landscaping" />
        <meta name="keywords" content="tree work, landscaping, culpepper, fredricksburg, richmond, virginia, small business, tree removal, tree trimming, stump grinding, emergency service" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
