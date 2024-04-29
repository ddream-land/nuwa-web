import React from "react";
import { NextIntlClientProvider,useMessages } from "next-intl";

const CharacterList = dynamic(() => import('../_ui/charas/CharacterList'), { ssr: false })
// import CharacterList from "../_ui/charas/CharacterList";
import dynamic from "next/dynamic";

export default function TabKeyPage() {
  const messages = useMessages();
  return (
    <>
      <div className="">
        <NextIntlClientProvider messages={messages}>
          <CharacterList />
        </NextIntlClientProvider>
      </div>
    </>
  );
}
