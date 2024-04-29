"use client"

import React, { useState } from "react";
import { getCharaList, pushCharaList } from "../../_lib/utils";
import { useTranslations } from "next-intl";
import { PencilIcon, TrashIcon } from "@heroicons/react/24/outline";
import Image from "next/image";
import { Button, Popover, PopoverContent, PopoverTrigger, useDisclosure } from "@nextui-org/react";
import CharacterCreate from "./CharacterCreate";
import { TypeCharaList, TypeCharaListItem } from "../../_lib/definitions";
import CharacterEdit from "./CharacterEdit";


export default function CharacterList() {
  const t = useTranslations();
  let initCharaList = getCharaList();
  const [charaList, setCharaList] = useState<TypeCharaList>(initCharaList);
  const [ editChara, setEditChara ] = useState<TypeCharaListItem>();

  const deleteChara = ({index}: {index: number}) => {
    const newCharaList = charaList.filter((_, i) => i !== index);
    pushCharaList(newCharaList);
    setCharaList(newCharaList);
  }


  return (
    <>
      <div className="relative bg-white h-full w-full pt-0 pb-40 rounded-[40px] px-8 flex flex-col justify-center">
        <div className="flex flex-row justify-end mt-2 z-4 mb-8">
          <CharacterCreate
            onCreateDone={(newChara) => {
              setCharaList(getCharaList())
              setEditChara(newChara);
            }}
          />
        </div>
        <div className="flex flex-wrap flex-row gap-4 min-h-[60vh]">
          {charaList.map((chara, index) => (
            <div className="w-[212px] group relative hover:scale-105" key={chara.uid}>
              <Image
                src={chara.cover}
                width={212}
                height={250}
                alt=""
                className="w-full h-[250px] flex-none object-cover rounded-[14px] border border-neutral-400 border-opacity-50"
              />
              <div className="w-full h-[250px] absolute top-0 bg-gray-50/50 hidden group-hover:block" />
              <div className="truncate px-2 w-full h-[36px] text-center text-stone-950 text-lg font-semibold leading-loose tracking-tight">
                {chara.chara.name}
              </div>
              <div className="absolute top-4 right-4 flex flex-col gap-4">
                <Popover placement="top" color='danger'>
                  <PopoverTrigger>
                    <Button
                      className="bg-black text-white opacity-0 group-hover:opacity-100"
                      startContent={<TrashIcon className="h-5 w-5"/>}
                      isIconOnly
                    ></Button>
                  </PopoverTrigger>
                  <PopoverContent>
                    <Button 
                      className="w-full font-semibold" 
                      size="sm" 
                      color="danger"
                      onClick={() => {
                        deleteChara({index})
                        // setChara(prev => ({
                        //   ...prev,
                        //   data: {
                        //     ...prev.data,
                        //     alternate_greetings: prev.data.alternate_greetings.filter((_, i) => i !== index)  
                        //   }
                        // }))
                        // setDeleteCount(deleteCount + 1);
                      }}
                    >    
                      {t('Previews.mymindismadeup')}
                    </Button>
                  </PopoverContent>
                </Popover>

                <Button
                  className="bg-black text-white opacity-0 group-hover:opacity-100"
                  startContent={<PencilIcon className="h-5 w-5"/>}
                  isIconOnly
                  onClick={() => {
                    setEditChara(chara);
                  }}
                ></Button>
              </div>
            </div>
          ))}
        </div>
        <CharacterEdit chara={editChara} onDone={() => {
          setEditChara(undefined);
          setCharaList(getCharaList());
        }} />
      </div>
    </>
  );
}
