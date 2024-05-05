"use client"

import React from "react";
import { useTranslations } from "next-intl";
import { PencilIcon, TrashIcon } from "@heroicons/react/24/outline";
import Image from "next/image";
import { Button, Popover, PopoverContent, PopoverTrigger } from "@nextui-org/react";
import { TypeCharaListItem } from "@/app/lib/definitions";


export default function CharacterListItem({chara, isPublished = false, onEdit, onDelete}: {
  chara: TypeCharaListItem;
  isPublished?: boolean;
  onEdit?: () => void;
  onDelete?: () => void;
}) {
  const t = useTranslations();
  
  return (
    <>
      <div className="w-full group flex flex-col justify-center items-center relative hover:scale-105">
        <Image
          src={(isPublished && chara.cover_url) ? chara.cover_url : chara.cover}
          width={212}
          height={250}
          alt=""
          className="w-[212px] h-[250px] flex-none object-cover rounded-[14px] border border-neutral-400 border-opacity-50"
        />
        
        <div className="w-full h-[250px] absolute top-0 bg-gray-50/50 hidden group-hover:block" />
        <div className="w-[200px] truncate px-2 h-[36px] text-center text-stone-950 text-lg font-semibold leading-loose tracking-tight">
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
                  onDelete && onDelete()
                }}
              >    
                {t('Previews.mymindismadeup')}
              </Button>
            </PopoverContent>
          </Popover>

          {onEdit && (
            <Button
              className="bg-black text-white opacity-0 group-hover:opacity-100"
              startContent={<PencilIcon className="h-5 w-5"/>}
              isIconOnly
              onClick={() => {
                onEdit && onEdit()
              }}
            ></Button>
          )}
        </div>
      </div>
    </>
  );
}
