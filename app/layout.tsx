import type { Metadata } from "next";
import "./../styles/globals.css";
import { ThemeProvider } from "@/context/ThemeContext";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AssistantRobot from "@/components/AssistantRobot";

export const metadata: Metadata = {
  title: "Byamugisha Alban | Software Engineer Portfolio",
  description:
    "Principal-level software engineer portfolio for Byamugisha Alban, showcasing scalable systems, secure architectures, and modern web applications.",
  metadataBase: new URL("https://www.albanbyamugisha.dev"),
  openGraph: {
    title: "Byamugisha Alban | Software Engineer Portfolio",
    description:
      "Designing and developing scalable software systems & modern web applications with a focus on security, performance, and user-centric experiences.",
    url: "https://www.albanbyamugisha.dev",
    siteName: "albanbyamugisha-portfolio",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Byamugisha Alban | Software Engineer Portfolio",
    description:
      "Engineering secure, scalable, and intelligent digital systems for modern businesses.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Byamugisha Alban",
    jobTitle: "Software Engineer",
    url: "https://www.albanbyamugisha.dev",
    address: {
      "@type": "PostalAddress",
      addressRegion: "Western Region",
      addressCountry: "Uganda",
    },
    sameAs: [
      "https://github.com/albanbyaugisha",
      "https://www.linkedin.com/in/byamugisha-alban-3140bb37a",
      "https://www.youtube.com/@albanbyaugisha",
    ],
  };

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      </head>
      <body className="soft-scroll antialiased">
        <ThemeProvider>
          <div className="grain-overlay" />
          <Navbar />
          <main className="mx-auto min-h-[calc(100vh-6rem)] max-w-6xl px-4 pt-10 lg:px-6">
            {children}
          </main>
          <Footer />
          <AssistantRobot />
        </ThemeProvider>
      </body>
    </html>
  );
}
