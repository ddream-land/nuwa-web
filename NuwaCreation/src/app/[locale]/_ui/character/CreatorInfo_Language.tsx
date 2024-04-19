"use client";
import React, { useRef } from "react";
import { useChara } from "../../_lib/utils";
import { useTranslations, useMessages } from "next-intl";
import NuwaCheckbox from "../components/NuwaCheckbox";


function CreatorInfo_Language() {
  const t = useTranslations();
  const messages = useMessages();
  const { Languages } = messages;
  const { chara , setChara } = useChara();

  const [groupSelected, setGroupSelected] = React.useState(chara.data.extensions.languages);

 

  return (
    <div className="bg-white h-full w-full rounded-[40px]">
      <div className="flex flex-col h-full w-full py-7 px-7 rounded-[40px]">
        <label
          className="text-neutral-950 text-lg font-semibold leading-loose tracking-tight"
        >
          {t('Character.language')}
        </label>
        <div className="mt-10">  
          <NuwaCheckbox
            items={Languages as unknown as {name: string, value: string}[]}
            value={groupSelected}
            onChange={(value: any) => {
              setGroupSelected(value as any)
              setChara((prevChara) => ({
                ...prevChara,
                data: {
                  ...prevChara.data,
                  extensions: {
                    ...prevChara.data.extensions,
                    languages: value
                  }
                }
              })
              )
            }}
          />
        </div> 
      </div>
    </div>
  );
}

export default CreatorInfo_Language;
