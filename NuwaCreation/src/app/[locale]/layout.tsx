import { Inter } from "next/font/google";
import { notFound } from "next/navigation";
import { getTranslations } from "next-intl/server";
import "./globals.css";
import { Providers } from "./providers";
import Sidebar from "./_ui/Sidebar";
import Header from "./_ui/Header";
import Footer from "./_ui/Footer";
import { NextIntlClientProvider,useMessages } from "next-intl";

// const locales = ["en", "zh-CN", "zh-TW", "de", "es", "fr", "ja", "kr", "pt", "ru", "it"];
const locales = ["en", "zh-CN"];

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
          <main className="lg:pl-72">
            <div className="">
              <NextIntlClientProvider messages={messages}>
                <Header locale={locale} />
              </NextIntlClientProvider>
              <div className="px-4 sm:px-6 lg:px-8 pt-4">{children}</div>
              <div className="pb-10 pt-10">
                <NextIntlClientProvider messages={messages}>
                  <Footer />
                </NextIntlClientProvider>
              </div>
            </div>
            
          </main>
        </Providers>
      </body>
    </html>
  );
}
