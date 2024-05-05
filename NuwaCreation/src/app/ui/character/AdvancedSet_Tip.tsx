"use client";
import React from "react";
import { useTranslations } from "next-intl";
import { Button } from "@nextui-org/react";
import { useCharaListItem, useCharaListItemDispatch } from "@/app/contexts/CharasContextProvider";
import ExclamationSquareIcon from "@/app/icons/ExclamationSquareIcon";
import { Link } from "@/navigation";

function AdvancedSet_Tip() {
  const t = useTranslations();
 
  const charaListItem = useCharaListItem();
  const charaListItemDispatch = useCharaListItemDispatch();
  const setCharaListItem = () => {
    charaListItemDispatch({
      type: "changed",
      payload: {
        ...charaListItem,
        chara: {
          ...charaListItem.chara,
          data: {
            ...charaListItem.chara.data,
            system_prompt: "",
            post_history_instructions: "",
            extensions: {
              ...charaListItem.chara.data.extensions,
              depth_prompt: {
                ...charaListItem.chara.data.extensions.depth_prompt,
                depth: 4,
              },
              talkativeness: "0.5",
            }
          }
        }
      },
    })
  }

  return (
    <div className="w-full">
      <div className="flex flex-row gap-2">
            <ExclamationSquareIcon className="w-6 h-6" />
            <div className="grow flex flex-col">
              <div className="text-neutral-800 text-sm font-normal font-['Inter'] leading-relaxed tracking-tight">{t('Character.advancedsettip')}</div>
              <div>
                <Link href="" className="text-neutral-700 text-xs font-normal font-['Inter'] underline leading-snug">{t('Character.advancedsetdoc')}</Link>
                <Button
                  variant="bordered"
                  className="border-none text-neutral-700 text-xs font-normal font-['Inter'] underline leading-snug"
                  onClick={() => setCharaListItem()}
                >{t('Character.advancedsetreset')}</Button>
              </div>
            </div>
          </div>
    </div>
  );
}

export default AdvancedSet_Tip;
