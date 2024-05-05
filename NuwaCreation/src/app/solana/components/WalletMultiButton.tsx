import React from 'react';
import { BaseWalletMultiButton } from './BaseWalletMultiButton';
import type { ButtonProps } from './Button';
import { useTranslations } from 'next-intl';


export default function WalletMultiButton(props: ButtonProps) {
    const t = useTranslations();
    const LABELS = {
        'change-wallet': t('Web3.changewallet'),
        'connecting': t('Web3.connecting'),
        'copy-address': t('Web3.copyaddress'),
        'copied': t('Web3.copied'),
        'disconnect': t('Web3.disconnect'),
        'has-wallet': t('Web3.haswallet'),
        'no-wallet': t('Web3.nowallet')
    } as const;
    
    return <BaseWalletMultiButton {...props} labels={LABELS} />;
}
