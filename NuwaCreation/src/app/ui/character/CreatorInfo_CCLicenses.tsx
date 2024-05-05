"use client";
import React from "react";
import { useTranslations, useMessages } from "next-intl";
import CCLicensesRadio from "../components/CCLicensesRadio";
import { Link } from "@/navigation";
import { useCharaListItem, useCharaListItemDispatch } from "@/app/contexts/CharasContextProvider";
import { textareaProps } from "../components/NuwaTextarea";


function CreatorInfo_CCLicenses() {
  const t = useTranslations();
  const messages = useMessages();

  const charaListItem = useCharaListItem();
  const charaListItemDispatch = useCharaListItemDispatch();
  const setCharaListItem = (newValue: string) => {
    charaListItemDispatch({
      type: "changed",
      payload: {
        ...charaListItem,
        chara: {
          ...charaListItem.chara,
          data: {
            ...charaListItem.chara.data,
            extensions: {
              ...charaListItem.chara.data.extensions,
              cclicense: newValue
            }
          }
        }
      },
    })
  }
 
  return (
    
    <div className="h-full w-full relative">
      <Link href="https://creativecommons.org/share-your-work/cclicenses/" target="_blank" className=" absolute top-2 right-0 text-black text-sm font-normal tracking-tight">
        {t('Character.copyrighttip3')}
      </Link>
      <div className="flex flex-col items-start">

        <label className={`${textareaProps.classNames.label} mb-0 mr-4`}>
          {t('Character.copyright')}
        </label>

        {/* <div className="text-black text-xl leading-9 tracking-tight">
          {t('Character.copyrighttip1')}
        </div> */}
        {/* <Link href="https://creativecommons.org/share-your-work/cclicenses/" target="_blank" className="text-neutral-500 text-sm font-normal -mt-4 tracking-tight">
          {t('Character.copyrighttip3')}
        </Link> */}
      </div>
      <div className="mt-10">  
        <CCLicensesRadio
          value={charaListItem.chara.data.extensions.cclicense}
          onChange={(e: any) => {
            if (e) {
              setCharaListItem(e.target.value)
            } else {
              setCharaListItem("")
            }
          }}
        />
      </div>
    </div>

  );
}

export default CreatorInfo_CCLicenses;
