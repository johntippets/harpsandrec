import type { Metadata } from "next";
import type { ReactNode } from "react";

import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://harpsandrec.com"),
  title: "Harps & Rec | Live harp music for meaningful gatherings",
  description:
    "Harps & Rec is based in Moseley, Virginia and is developing live harp performance and educational programming for Richmond-area gatherings.",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Harps & Rec | Live harp music for meaningful gatherings",
    description:
      "A developing live harp performance and educational programming project serving the Richmond, Virginia area from Moseley.",
    url: "/",
    siteName: "Harps & Rec",
    locale: "en_US",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
