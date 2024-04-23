import React from "react";
import { NextIntlClientProvider,useMessages } from "next-intl";
import CharaBook from "../_ui/charabook/CharaBook";

export default function CharaBookPage() {
  const messages = useMessages();
  return (
    <>
      <div className="">
        <NextIntlClientProvider messages={messages}>
          <CharaBook/>
        </NextIntlClientProvider>
      </div>
    </>
  );
}
