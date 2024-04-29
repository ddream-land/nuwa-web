"use client";
import React from "react";
import Preview_AddTags from './Preview_AddTags';
import Image from "next/image";
import { useTranslations } from "next-intl";
import { TypeCharaListItem } from "../../_lib/definitions";
import { Tooltip } from "@nextui-org/react";

function Preview_BaseInfo({charaItem}: {charaItem: TypeCharaListItem}) {
  const t = useTranslations();

  const { chara, cover } = charaItem
  
  return (
    <div className="flex flex-col lg:flex-row gap-20 w-full items-center">
      <div className="w-[200px] gap-x-8 shrink-0">
        <Image
          src={cover}
          width={200}
          height={340}
          alt=""
          className="h-full w-full flex-none rounded-[40px] object-cover"
        />
      </div>

      <div
        className="overflow-hidden flex flex-col w-full"
      >
        <Tooltip showArrow={true} content={chara.data.name|| t('Preview.unnamed')} className="text-lg">
          <div className="truncate text-black text-[100px] font-semibold leading-[120px] tracking-wide">{chara.data.name || t('Preview.unnamed')}</div>
        </Tooltip>
        {/* <div className="my-10 w-full text-neutral-950 text-base font-normal leading-[29px] tracking-tight">{chara.data.description}</div> */}
        <Preview_AddTags />
      </div>
    </div>
  );
}

export default Preview_BaseInfo;
