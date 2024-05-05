import { redirect } from "@/navigation";
import { NextIntlClientProvider, useMessages } from "next-intl";
import Overview from "../ui/overview/Overview";
export default function Home() {
  const messages = useMessages();
  
  redirect(`/overview`)
  return (
    <>
      <NextIntlClientProvider messages={messages}>
        <Overview />
      </NextIntlClientProvider>
    </>
  );
}
