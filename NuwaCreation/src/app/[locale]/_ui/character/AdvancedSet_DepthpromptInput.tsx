"use client";
import React from "react";;
import { useTranslations } from "next-intl";
import { useCharaListItem, useCharaListItemDispatch } from "../charas/CharaContext";
import NuwaInput from "../components/NuwaInput";

function AdvancedSet_DepthpromptInput() {
  const t = useTranslations();
 
  const charaListItem = useCharaListItem();
  const charaListItemDispatch = useCharaListItemDispatch();
  const setNewDepthListItem = (newValue: string) => {
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
    <NuwaInput
      label={`${t('Character.depthprompt')}`}
      placeholder={`${t('Character.depthprompt')}`}
      value={charaListItem.chara.data.extensions.depth_prompt.depth}
      onChange={(e: { target: { value: any; }; }) => {
        let newDepth = e.target.value;
                        
        if (parseInt(newDepth) < 0) {
          newDepth = '0'
        } else if (parseInt(newDepth) > 999) {
          newDepth = '999'
        }

        setNewDepthListItem(newDepth)
      }}
      max="999"
      min="0"
      type="number"
    />
  );
}

export default AdvancedSet_DepthpromptInput;
