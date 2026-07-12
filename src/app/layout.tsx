import type { Metadata } from "next";
import type { ReactNode } from "react";

import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://harpsandrec.com"),
  title: "Harps & Rec | Live harp music for meaningful gatherings",
  description:
    "Harps & Rec is Natalee Tippets' developing live harp performance and educational programming project for meaningful local gatherings.",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Harps & Rec | Live harp music for meaningful gatherings",
    description:
      "A developing live harp performance and educational programming project by Natalee Tippets.",
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
