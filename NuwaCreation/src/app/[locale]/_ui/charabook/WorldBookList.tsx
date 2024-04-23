"use client"

import React, { useState } from "react";
import { useChara, useCharacterBook } from "../../_lib/utils";
import { useTranslations, useMessages } from "next-intl";
import { NoSymbolIcon, PlusIcon, TrashIcon } from "@heroicons/react/24/outline";
import Image from "next/image";
import { Link } from "@/navigation";
import LIVE2DIcon from "../icons/LIVE2DIcon";
import { TypeAvatarType } from "../../_lib/definitions.avatar";
import A3DIcon from "../icons/A3DIcon";
import ImageIcon from "../icons/ImageIcon";
import { Button, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, Popover, PopoverContent, PopoverTrigger, useDisclosure } from "@nextui-org/react";
import IconCard, {IconCardType} from "../components/IconCard";
import NuwaButton from "../components/NuwaButton";
import { PencilSquareIcon } from "@heroicons/react/24/outline";

function classNames(...classes:any) {
  return classes.filter(Boolean).join(' ')
}

export default function WorldBookList() {
  const t = useTranslations();
  const messages = useMessages();
  const { chara , setChara } = useChara();
  const { character_book, setCharacter_Book } = useCharacterBook();
  const uploadModal = useDisclosure();
  let initWorldbookList = [character_book, character_book];
  if (chara.data.character_book) {
    initWorldbookList.push(chara.data.character_book)
    initWorldbookList.push(chara.data.character_book)
  }
  const [worldbookList, setWorldbookList] = useState(initWorldbookList)


  return (
    <div className="relative bg-white h-full w-full pt-20 pb-40 rounded-[40px]">
      <div className="px-7">
        <div className="grid 2xl:grid-cols-3 3xl:grid-cols-4 md:grid-cols-2 sm:grid-cols-2 gap-4 py-10 px-7 overflow-visible h-auto">
          
          {worldbookList.map((worldBookItem, index) => (
            <div className="relative group bg-[#979797] w-auto h-[340px] rounded-lg shadow-lg shadow-black/25 py-8 px-3">
              <div className="border-y border-solid border-white text-white font-semibold text-2xl line-clamp-1">{worldBookItem.name}</div>
              <div className="pt-14 pb-4 h-full overflow-y-scroll w-auto text-white break-words">
              {worldBookItem.entries.map((entry, index) => (
                <p key={`entries${index}`}>{entry.comment}</p>
              ))}
              </div>


              <div className="absolute top-4 right-4 flex flex-col gap-4">
                <Popover placement="top" color='warning'>
                  <PopoverTrigger>
                    <Button
                      className="bg-black text-white opacity-0 group-hover:opacity-100"
                      startContent={<TrashIcon className="h-5 w-5"/>}
                      isIconOnly
                    ></Button>
                  </PopoverTrigger>
                  <PopoverContent>
                    <Button 
                      className="w-full" 
                      size="sm" 
                      color="warning"
                      onClick={() => {
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
                  startContent={<PencilSquareIcon className="h-5 w-5"/>}
                  isIconOnly
                ></Button>
              </div>
            </div>
          ))}
      </div>
      </div>
    </div>
  );
}
