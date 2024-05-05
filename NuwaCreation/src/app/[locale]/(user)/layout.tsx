import { Inter } from "next/font/google";
import { notFound } from "next/navigation";
import { getTranslations } from "next-intl/server";
import { NextIntlClientProvider,useMessages } from "next-intl";
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
    <main className="w-screen h-screen bg-black">
      <NextIntlClientProvider messages={messages}>
        <AlterMessageContextProvider>
          {children}
        </AlterMessageContextProvider>
      </NextIntlClientProvider>
    </main>
  );
}
