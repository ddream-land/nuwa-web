"use client";
import React from "react";
import { Button } from "@nextui-org/react";
import A3DIcon from "../icons/A3DIcon";
import ImageIcon from "../icons/ImageIcon";
import LIVE2DIcon from "../icons/LIVE2DIcon";
import { NoSymbolIcon, PlusIcon } from "@heroicons/react/24/outline";
import { Icon } from "next/dist/lib/metadata/types/metadata-types";
import { useTranslations } from "next-intl";

function classNames(...classes:any) {
  return classes.filter(Boolean).join(' ')
}

export const IconCardType = {
  "LIVE2D": LIVE2DIcon,
  "3D": A3DIcon,
  "IMAGE": ImageIcon,
}

function IconCard({onClick, isActive = false, iconType = "LIVE2D"}: {onClick: () => any, isActive?: boolean, iconType?: any }) {

  const t = useTranslations();
  return (
    <div
      onClick={onClick}
      className={classNames('group hover:bg-black shrink-0 flex flex-col items-center justify-center border border-neutral-400 border-opacity-50 cursor-pointer w-[174px] h-[206px] rounded-[14px]', (
        isActive ? 'bg-black': 'bg-white'
      ))}
    >
    {iconType === "LIVE2D" && (
      <LIVE2DIcon
        className={classNames('w-28 group-hover:fill-white', (
          isActive ? 'fill-white' : 'fill-stone-950'
        ))}
        aria-hidden="true"
      />
    )}
    {iconType === "3D" && (
      <A3DIcon
        className={classNames('w-24 group-hover:fill-white', (
          isActive ? 'fill-white' : 'fill-stone-950'
        ))}
        aria-hidden="true"
      />
    )}
    {iconType === "IMAGE" && (
      <ImageIcon
        className={classNames('w-34 group-hover:fill-white', (
          isActive ? 'fill-white' : 'fill-stone-950'
        ))}
        aria-hidden="true"
      />
    )}

      <div className={classNames('text-center text-base font-normal leading-[29px] tracking-tight group-hover:text-white', (
        isActive ? 'text-white' : 'text-stone-950'
      ))} >{t(`Character.${iconType}`)}</div>
    </div>
  );
}

export default IconCard;
