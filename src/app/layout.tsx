import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { notFound } from "next/navigation";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/sonner";
import { unstable_setRequestLocale } from "next-intl/server";

import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    default: "Chanly - اكتشف مجتمعك المفضل على واتساب",
    template: "%s | Chanly",
  },
  description: "المنصة الأولى التي تضمن لك روابط فعالة 100%، وتوصيات مدعومة بالذكاء الاصطناعي.",
  keywords: ["واتساب", "قنوات واتساب", "مجتمعات واتساب", "chanly", "اكتشاف قنوات"],
  authors: [{ name: "Chanly Team" }],
  creator: "Chanly",
  publisher: "Chanly",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://chanly.com"),
  openGraph: {
    title: "Chanly - اكتشف مجتمعك المفضل على واتساب",
    description: "المنصة الأولى التي تضمن لك روابط فعالة 100%، وتوصيات مدعومة بالذكاء الاصطناعي.",
    url: "https://chanly.com",
    siteName: "Chanly",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Chanly - WhatsApp Channels Discovery Platform",
      },
    ],
    locale: "ar_SA",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Chanly - اكتشف مجتمعك المفضل على واتساب",
    description: "المنصة الأولى التي تضمن لك روابط فعالة 100%، وتوصيات مدعومة بالذكاء الاصطناعي.",
    images: ["/twitter-image.png"],
  },
  verification: {
    google: "your-google-verification-code",
  },
};

const locales = ["ar", "en"];

interface RootLayoutProps {
  children: React.ReactNode;
  params: { locale: string };
}

export default async function RootLayout({
  children,
  params: { locale },
}: RootLayoutProps) {
  // Validate that the incoming `locale` parameter is valid
  if (!locales.includes(locale)) notFound();

  // Enable static rendering
  unstable_setRequestLocale(locale);

  // Providing all messages to the client
  // side is the easiest way to get started
  const messages = await getMessages();

  return (
    <html lang={locale} dir={locale === "ar" ? "rtl" : "ltr"} suppressHydrationWarning>
      <head />
      <body className={inter.className}>
        <NextIntlClientProvider messages={messages}>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            {children}
            <Toaster
              richColors
              position={locale === "ar" ? "top-left" : "top-right"}
              theme="system"
            />
          </ThemeProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}