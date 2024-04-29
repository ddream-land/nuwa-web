"use client";
import React from "react";
import { useTranslations } from "next-intl";
import { Slider } from "@nextui-org/react";
import { useCharaListItem, useCharaListItemDispatch } from "../charas/CharaContext";
import { textareaProps } from "../components/NuwaTextarea";

function AdvancedSet_Talkativeness() {
  const t = useTranslations();
 
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
              talkativeness: newValue
            }
          }
        }
      },
    })
  }

  return (
    
    <div className="h-full w-full relative">
      <div className="flex flex-col items-start">
        <label className={`${textareaProps.classNames.label} mb-0 mr-4`}>
          {t('Character.talkativeness')}
        </label>
        <Slider 
          showTooltip={false}
          step={0.1} 
          maxValue={1}
          minValue={0}
          marks={[
            {
              value: 0,
              label: t('Character.talkativeness0'),
            },
            {
              value: 0.5,
              label: t('Character.talkativeness05'),
            },
            {
              value: 1,
              label: t('Character.talkativeness1'),
            },
          ]}
          defaultValue={0.5}
          classNames={{
            mark: "text-nowrap w-8",
          }}
          value={charaListItem.chara.data.extensions.talkativeness as unknown as number}
          onChange={(value) => {
            setCharaListItem(value.toString())
          }}
          ></Slider>
      </div>
    </div>
  );
}

export default AdvancedSet_Talkativeness;
