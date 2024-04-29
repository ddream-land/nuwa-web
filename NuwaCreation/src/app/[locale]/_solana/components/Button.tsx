import type { CSSProperties, FC, MouseEvent, PropsWithChildren, ReactElement } from 'react';
import React from 'react';
import { Button as NextUiButton, ButtonProps as BaseButtonProps } from "@nextui-org/react";
import NuwaButton from '../../_ui/components/NuwaButton';

export type ButtonProps = PropsWithChildren<{
    className?: string;
    disabled?: boolean;
    endIcon?: ReactElement;
    onClick?: (e: MouseEvent<HTMLButtonElement>) => void;
    startIcon?: ReactElement;
    style?: CSSProperties;
    tabIndex?: number;
    size?: string,
    shadowghost?: string,
}>;


export const Button: FC<ButtonProps> = (props) => {
    return (
        <NuwaButton
            className={`${props.className || 'text-black'}`}
            disabled={props.disabled}
            onClick={props.onClick}
            size={props.size as any}
            shadowghost={props.shadowghost as any}
            tabIndex={props.tabIndex || 0}
            startContent={<i className="w-6 h-6">{props.startIcon}</i>}
            endContent={<i className="w-6 h-6">{props.endIcon}</i>}
        >
            {/* {props.startIcon && <i className="wallet-adapter-button-start-icon">{props.startIcon}</i>} */}
            {props.children}
            {/* {props.endIcon && <i className="wallet-adapter-button-end-icon">{props.endIcon}</i>} */}
        </NuwaButton>
    );
};
