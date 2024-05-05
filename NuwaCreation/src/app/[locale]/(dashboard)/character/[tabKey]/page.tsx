import React from "react";
import { NextIntlClientProvider,useMessages } from "next-intl";
import Character from "@/app/ui/character/Character";

export default function TabKeyPage() {
  const messages = useMessages();
  return (
    <>
      <div className="">
        <NextIntlClientProvider messages={messages}>
          <Character/>
        </NextIntlClientProvider>
      </div>
    </>
  );
}
