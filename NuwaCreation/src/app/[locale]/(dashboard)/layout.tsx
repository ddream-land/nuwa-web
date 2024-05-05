import { Inter } from "next/font/google";
import { notFound } from "next/navigation";
import { getTranslations } from "next-intl/server";
import Header from "@/app/ui/dashboard/Header";
import Footer from "@/app/ui/dashboard/Footer";
import { NextIntlClientProvider,useMessages } from "next-intl";
import Sidebar from "@/app/ui/dashboard/sidebar/Sidebar";
import { AlterMessageContextProvider } from "@/app/ui/components/AlterMessageContextProvider";

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
    <>
      <NextIntlClientProvider messages={messages}>
        <AlterMessageContextProvider>
        <Sidebar/>
        <main className="lg:pl-72">
          <div className="">
              <Header />
            <div className="px-4 sm:px-12 lg:px-14 pt-4">{children}</div>
            <div className="pb-10 pt-10">
              <Footer />
            </div>
          </div>
        </main>
        </AlterMessageContextProvider>
      </NextIntlClientProvider>
    </>
  );
}
