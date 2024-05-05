import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { Connection, clusterApiUrl, PublicKey } from "@solana/web3.js";
import { FC, useCallback, useMemo, useState } from "react";
import { WalletAdapterNetwork, WalletError } from "@solana/wallet-adapter-base";
import useUserSOLBalanceStore from "../stores/useUserSOLBalanceStore";
import { Metaplex, walletAdapterIdentity } from "@metaplex-foundation/js";

export default function MintNFTButton() {
  const [nft, setNft] = useState(null);
  const { connection } = useConnection();
  const wallet = useWallet();
  const { getUserSOLBalance } = useUserSOLBalanceStore();

  const metaplex = Metaplex.make(connection).use(walletAdapterIdentity(wallet));

  const onClick = useCallback(async () => {
    
    // createNft();
    fetchNft();
    
  }, [wallet.publicKey, connection, getUserSOLBalance]);

  const [address, setAddress] = useState(
    "56Wbq1FEuRVKNWVTEiPppJrSoGHqAt4W8Ua13pLDteC5"
  );

  const createNft = async () => {
    const uri = "https://nftstorage.link/ipfs/bafybeiedv7sowwxamly4oicivudp45rsfvbklnf3fvbvonxrwoxqylhtwq/0.json"

      const { nft } = await metaplex.nfts().create({
        uri: uri,
        name: "My NFT",
        sellerFeeBasisPoints: 500, // Represents 5.00%.
    });
    console.log(nft);
  }


  const fetchNft = async () => {
    const asset = await metaplex
      .nfts()
      .findByMint({ mintAddress: new PublicKey(address) });
    setNft(asset as any);
    console.log(asset);
  };

  return (
    <button
      className="px-8 m-2 btn animate-pulse bg-gradient-to-r from-[#9945FF] to-[#14F195] hover:from-pink-500 hover:to-yellow-500 ..."
      onClick={onClick}
    >
      MintNFT
    </button>
  );
}
