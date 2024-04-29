import React from 'react'
import Me from '../_ui/me/Me'
import { NextIntlClientProvider,useMessages } from 'next-intl'
require('@solana/wallet-adapter-react-ui/styles.css');

function SettingsPage() {
  const messages = useMessages();
  return (
    <>
      <NextIntlClientProvider messages={messages}>
        <Me />
      </NextIntlClientProvider>
    </>
  )
}

export default SettingsPage