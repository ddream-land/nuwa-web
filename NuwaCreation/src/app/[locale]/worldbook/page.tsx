import React from "react";
import { NextIntlClientProvider, useMessages } from "next-intl";
import dynamic from 'next/dynamic';

const WorldBookList = dynamic(() => import('../_ui/worldbook/WorldBookList'), {
  ssr: false
});

export default function WorldBookPage() {
  const messages = useMessages();

  return (
    <div className="flex w-full flex-col">
      <NextIntlClientProvider messages={messages}>
        <WorldBookList />
      </NextIntlClientProvider>
    </div>
  );
}