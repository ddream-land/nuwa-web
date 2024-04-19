"use client";
import React, { useRef } from "react";
import { useChara } from "../../_lib/utils";
import { useTranslations } from "next-intl";

function AdvancedSet_Base() {
  const t = useTranslations();
  const { chara , setChara } = useChara();
 

  return (
    <div className="bg-white h-full w-full rounded-[40px] relative flex flex-col">
      <div className="flex flex-col h-auto w-full py-7 px-7 rounded-[40px]">
        <label
          className="text-neutral-950 text-lg font-semibold leading-loose tracking-tight"
        >
          {t('Character.depthprompt')}
        </label>
        <div className="">  
          <input
            placeholder={`${t('Character.depthprompt')}`}
            value={chara.data.extensions.depth_prompt.depth}
            onChange={(e) =>
              setChara((prevChara) => {
                let newDepth = e.target.value;
                
                if (parseInt(newDepth) < 0) {
                  newDepth = '0'
                } else if (parseInt(newDepth) > 999) {
                  newDepth = '999'
                }

                return {
                ...prevChara,
                data: {
                  ...prevChara.data,
                  extensions: {
                    ...prevChara.data.extensions,
                    depth_prompt: {
                      ...prevChara.data.extensions.depth_prompt,
                      depth: newDepth,
                    },
                  },
                },
              }})
            }
            max="999"
            min="0"
            type="number"
            className="text-neutral-950 text-base font-normal tracking-tight border-none outline-none w-full resize-none bg-transparent"
          />
        </div> 
      </div>
      <div className=" absolute top-32 h-48 w-full rounded-[40px] bg-zinc-100 z-10"></div>
      <div className="flex flex-col h-auto w-full py-7 px-7 rounded-[40px] bg-zinc-100 z-20">
        <label
          className="text-neutral-950 text-lg font-semibold leading-loose tracking-tight"
        >
          {t('Character.mainprompt')}
        </label>
        <div className="">  
          <input
            placeholder={`${t('Character.mainprompt')}`}
            value={chara.data.system_prompt}
            onChange={(e) => setChara((prevChara) => ({ ...prevChara, data: { ...prevChara.data, system_prompt: e.target.value } }))}
            className="text-neutral-950 text-base font-normal tracking-tight border-none outline-none w-full resize-none bg-transparent"
          />
        </div> 
      </div>
      <div className=" absolute top-64 h-48 w-full rounded-[40px] bg-stone-300 z-30"></div>
      <div className="z-30 grow flex flex-col w-full py-7 px-7 rounded-[40px] bg-stone-300 bg-[url('/character-creatorinfo-bg.png')] bg-no-repeat bg-[bottom_1rem_right_3rem]">
        <label
          className="text-neutral-950 text-lg font-semibold leading-loose tracking-tight"
        >
          {t('Character.jailbreak')}
        </label>
        <div className="h-full">  
          <input
            placeholder={`${t('Character.jailbreak')}`}
            value={chara.data.post_history_instructions}
            onChange={(e) => setChara((prevChara) => ({ ...prevChara, data: { ...prevChara.data, post_history_instructions: e.target.value } }))}
            maxLength={64}
            className="text-neutral-950 text-base font-normal tracking-tight border-none outline-none w-full resize-none bg-transparent"
          />
        </div>
      </div>
    </div>
  );
}

export default AdvancedSet_Base;
