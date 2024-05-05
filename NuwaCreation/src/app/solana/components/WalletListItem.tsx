import { WalletReadyState } from '@solana/wallet-adapter-base';
import type { Wallet } from '@solana/wallet-adapter-react';
import type { FC, MouseEventHandler } from 'react';
import React from 'react';
import { Button } from './Button';
import { WalletIcon } from './WalletIcon';
import { useTranslations } from 'next-intl';

export interface WalletListItemProps {
    handleClick: MouseEventHandler<HTMLButtonElement>;
    tabIndex?: number;
    wallet: Wallet;
}

export const WalletListItem: FC<WalletListItemProps> = ({ handleClick, tabIndex, wallet }) => {
    const t = useTranslations();
    return (
        <li>
            <Button className='wallet-adapter-button' onClick={handleClick} startIcon={<WalletIcon wallet={wallet} />} tabIndex={tabIndex}>
                {wallet.adapter.name}
                {wallet.readyState === WalletReadyState.Installed && <span>{t("Web3.detected")}</span>}
            </Button>
        </li>
    );
};
