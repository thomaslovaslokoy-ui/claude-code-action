import type { Metadata } from "next";
import "./globals.css";
import Nav from "@/components/layout/Nav";
import Footer from "@/components/layout/Footer";

export const metadata: Metadata = {
  metadataBase: new URL("https://bankaffiliate.com"),
  title: {
    default: "BankAffiliate — Global Bank Directory",
    template: "%s | BankAffiliate",
  },
  description:
    "Compare 247+ global banks. Find the best savings rates, commissions, and affiliate programs worldwide.",
  keywords: [
    "bank affiliate",
    "bank comparison",
    "best savings rate",
    "bank commission",
    "global banks directory",
  ],
  authors: [{ name: "NorwegianSpark SA" }],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=JetBrains+Mono:wght@400;600&family=Playfair+Display:wght@700;800;900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="font-body antialiased">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              name: "BankAffiliate",
              url: "https://bankaffiliate.com",
              description:
                "Global bank directory and affiliate program comparison",
              publisher: {
                "@type": "Organization",
                name: "NorwegianSpark SA",
                email: "norwegianspark@gmail.com",
              },
            }),
          }}
        />
        <Nav />
        <main className="min-h-screen">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
