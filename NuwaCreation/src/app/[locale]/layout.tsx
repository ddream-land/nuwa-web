import { Inter } from "next/font/google";
import { notFound } from "next/navigation";
import "./globals.css";
import { Providers } from "./providers";

const locales = ["en", "zh-CN"];

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
  params: { locale },
}: {
  children: React.ReactNode;
  params: any;
}) {
  if (!locales.includes(locale as any)) notFound();
  return (
    <html lang={locale}>
      <body className={inter.className}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}