"use client";
import React from "react";;
import { useTranslations } from "next-intl";
import { useCharaListItem, useCharaListItemDispatch } from "../charas/CharaContext";
import NuwaInput from "../components/NuwaInput";
import { textareaProps } from "../components/NuwaTextarea";
import { Slider } from "@nextui-org/react";

function AdvancedSet_Depthprompt() {
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
              depth_prompt: {
                ...charaListItem.chara.data.extensions.depth_prompt,
                depth: newValue,
              },
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
          {t('Character.depthprompt')}
        </label>
        <div className=" absolute right-0 top-5 mt-1 mr-1 text-black text-sm">{charaListItem.chara.data.extensions.depth_prompt.depth}</div>
        <Slider 
          showTooltip={true}
          step={1} 
          maxValue={999}
          minValue={0}
          marks={[
            {
              value: 0,
              label: "0",
            },
            {
              value: 500,
              label: "500",
            },
            {
              value: 999,
              label: "999",
            },
          ]}
          defaultValue={4}
          color="primary"
          classNames={{
            base: "",
            track: "",
            mark: "",
            filler: "",
            labelWrapper: "",
            label: "",
            value: "",
            thumb: [],
            step: ""
          }}
          value={charaListItem.chara.data.extensions.depth_prompt.depth}
          onChange={(value) => {
            setCharaListItem(value.toString())
          }}
          ></Slider>
      </div>
    </div>
  );
}

export default AdvancedSet_Depthprompt;
