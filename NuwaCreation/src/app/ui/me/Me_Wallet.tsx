"use client";

import dynamic from "next/dynamic";
import { useEffect } from "react";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
const MintNFTButton = dynamic(() => import('@/app/solana/components/MintNFTButton'), { ssr: false })
const WalletMultiButton  = dynamic(() => import('@/app/solana/components/WalletMultiButton'), { ssr: false })


export default function Me_Wallet({onChange}: {onChange?: (walletPublicKey: string) => void}) {

  const wallet = useWallet();
  const { connection } = useConnection();

  useEffect(() => {
    if (wallet.publicKey) {
      onChange && onChange(wallet.publicKey.toBase58())
    }
  }, [wallet.publicKey])


  return (
    <>
      <WalletMultiButton
        size="sm"
        shadowghost="black"
        className="w-[140px]"
      />
      {/* <MintNFTButton /> */}
    </>
  );
}
