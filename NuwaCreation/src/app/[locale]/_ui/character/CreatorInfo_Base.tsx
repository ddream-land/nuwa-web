"use client";
import React, { useRef } from "react";
import { useChara } from "../../_lib/utils";
import { useTranslations } from "next-intl";
import { Input } from "@nextui-org/react";

function CreatorInfo_Base() {
  const t = useTranslations();
  const { chara , setChara } = useChara();
 

  return (
    <div className="bg-white h-full w-full rounded-[40px] relative flex flex-col">
      <div className="flex flex-col h-auto w-full py-7 px-7 rounded-[40px]">
        <label
          className="text-neutral-950 text-lg font-semibold leading-loose tracking-tight"
        >
          {t('Character.createdby')}
        </label>
        <div className="">  
          <input
            placeholder={`${t('Character.createdby')}`}
            value={chara.data.creator}
            onChange={(e) => setChara((prevChara) => ({ ...prevChara, data: { ...prevChara.data, creator: e.target.value } }))}
            maxLength={64}
            className="text-neutral-950 text-base font-normal tracking-tight border-none outline-none w-full resize-none bg-transparent"
          />
        </div> 
      </div>
      <div className=" absolute top-32 h-48 w-full rounded-[40px] bg-zinc-100 z-10"></div>
      <div className="flex flex-col h-auto w-full py-7 px-7 rounded-[40px] bg-zinc-100 z-20">
        <label
          className="text-neutral-950 text-lg font-semibold leading-loose tracking-tight"
        >
          {t('Character.characterversion')}
        </label>
        <div className="">  
          <input
            placeholder={`${t('Character.characterversion')}`}
            value={chara.data.character_version}
            onChange={(e) => setChara((prevChara) => ({ ...prevChara, data: { ...prevChara.data, character_version: e.target.value } }))}
            maxLength={64}
            className="text-neutral-950 text-base font-normal tracking-tight border-none outline-none w-full resize-none bg-transparent"
          />
        </div> 
      </div>
      <div className="z-30 grow flex flex-col w-full py-7 px-7 rounded-[40px] bg-stone-300 bg-[url('/character-creatorinfo-bg.png')] bg-no-repeat bg-[bottom_1rem_right_3rem]">
        <label
          className="text-neutral-950 text-lg font-semibold leading-loose tracking-tight"
        >
          {t('Character.creatorsnotes')}
        </label>
        <div className="h-full">  
          <textarea
            placeholder={`${t('Character.creatorsnotes')}`}
            value={chara.data.creator_notes}
            onChange={(e) => setChara((prevChara) => ({ ...prevChara, data: { ...prevChara.data, creator_notes: e.target.value } }))}
            className="text-neutral-950 text-base font-normal leading-[28.99px] tracking-tight border-none outline-none w-full h-full resize-none mb-6 bg-transparent"
          />
        </div> 
      </div>
    </div>
  );
}

export default CreatorInfo_Base;
