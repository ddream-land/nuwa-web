import { Inter } from "next/font/google";
import { notFound } from "next/navigation";
import { getTranslations } from "next-intl/server";
import "./globals.css";
import { Providers } from "./providers";
import Sidebar from "./_ui/Sidebar";
import Footer from "./_ui/Footer";
import { NextIntlClientProvider,useMessages } from "next-intl";
import Header from "./_ui/Header";

const locales = ["en", "zh-CN", "zh-TW", "de", "es", "fr", "ja", "kr", "pt", "ru", "it"];

const inter = Inter({ subsets: ["latin"] });

export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: string };
}) {
  const t = await getTranslations({ locale });

  return {
    title: t("Metadata.title"),
    description: t("Metadata.description"),
  };
}

export default function RootLayout({
  children,
  params: { locale },
}: {
  children: React.ReactNode;
  params: any;
}) {
  if (!locales.includes(locale as any)) notFound();
  const messages = useMessages();
  return (
    <html lang={locale}>
      <body className={inter.className} > 
        <Providers>
          <NextIntlClientProvider messages={messages}>
            <Sidebar/>
          </NextIntlClientProvider>
          <main className="py-10 lg:py-10 lg:pl-72">
            {/* <Header /> */}
            <div className="px-4 sm:px-6 lg:px-8 min-w-[600px]">{children}</div>
            <div className="pb-10 pt-10">

              <NextIntlClientProvider messages={messages}>
                <Footer />
              </NextIntlClientProvider>
            </div>
          </main>
        </Providers>
      </body>
    </html>
  );
}
