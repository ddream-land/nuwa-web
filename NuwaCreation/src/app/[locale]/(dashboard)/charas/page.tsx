import React from "react";
import { NextIntlClientProvider,useMessages } from "next-intl";

const CharacterList = dynamic(() => import('@/app/ui/charas/CharacterList'), { ssr: false })
// import CharacterList from "@/app/ui/charas/CharacterList";
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
