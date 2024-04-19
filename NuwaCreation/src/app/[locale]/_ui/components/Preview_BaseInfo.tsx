"use client";
import React from "react";
import { useChara,useCover } from "../../_lib/utils";
import Preview_AddTags from './Preview_AddTags';
import Image from "next/image";
import { useTranslations } from "next-intl";

function Preview_BaseInfo() {
  const t = useTranslations();
  const { chara , setChara } = useChara();
  const { cover , setCover } = useCover();
  
  return (
    <div>   
      <div className="grid grid-cols-5 gap-10">
        <div className="col-span-2 gap-x-8">
          <Image
            src={cover}
            width={375}
            height={500}
            alt=""
            className="h-full w-full flex-none rounded-[40px] object-cover"
          />
        </div>
        <div
          className="col-span-3 flex flex-col"
        >
          <div className="text-black text-[120px] font-semibold leading-[120px] tracking-wide">{chara.data.name}</div>
          <div className="mb-20 w-full mt-10 text-neutral-950 text-base font-normal leading-[29px] tracking-tight">{chara.data.description}</div>
          <Preview_AddTags />
        </div>

      </div>
    </div>
  );
}

export default Preview_BaseInfo;
