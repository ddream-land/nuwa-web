"use client";
import React, { RefObject, useRef, useState } from "react";
import { useTranslations } from "next-intl";
import { Button, Popover, PopoverContent, PopoverTrigger, Textarea } from "@nextui-org/react";
import { PlusIcon, TrashIcon } from "@heroicons/react/24/outline";
import InsertUserOrChar from "../components/InsertUserOrChar";
import { useCharaListItem, useCharaListItemDispatch } from "@/app/contexts/CharasContextProvider";
import { textareaProps } from "../components/NuwaTextarea";
import NuwaButton from "../components/NuwaButton";

function InforMation_AlternateGreetings() {
  const descTextareaRefs = useRef<{ [key: string]: RefObject<HTMLElement> | null }>({});
  const t = useTranslations();
  const [deleteCount, setDeleteCount] = useState(1);

  const charaListItem = useCharaListItem();
  const charaListItemDispatch = useCharaListItemDispatch();
  const setCharaListItem = (newValue: string[]) => {
    charaListItemDispatch({
      type: "changed",
      payload: {
        ...charaListItem,
        chara: {
          ...charaListItem.chara,
          data: {
            ...charaListItem.chara.data,
            alternate_greetings: newValue,
          }
        }
      },
    })
  }

  const updateAlternateGreetings = (newValue: string, index: number) => {
    const newAlternateGreetings = charaListItem.chara.data.alternate_greetings.map((greet, i) => 
      i === index ? newValue : greet  
    );
    setCharaListItem(newAlternateGreetings);
  }

  const handleAddGreetingsClick = () => {
    
    setCharaListItem([
      ...charaListItem.chara.data.alternate_greetings,
      `New Greetings`  
    ])
  };

  return (
    <div className="grid grid-cols-1 gap-4 mt-4">
      {charaListItem.chara.data.alternate_greetings.map((item, index) => (
        <div className="relative group" key={deleteCount + index}>
          <Textarea
            {...textareaProps as any}
            ref={r => { (descTextareaRefs.current[index] as any) = r; }}
            placeholder={t('Character.firstmessage')}
            value={item}
            onChange={(e) => {
              updateAlternateGreetings(e.target.value, index)
            }}
          />
          <div className="z-40 hidden group-hover:block absolute -top-16 right-0 pl-10 sm:top-auto sm:-right-44 sm:bottom-0 sm:pt-20">
            <Popover placement="left" color='danger' className="hidden">
              <PopoverTrigger>
                <NuwaButton
                  shadowghost="black"
                  className="mb-2 w-full hidden"
                >
                  {t('Character.insertuserorchardelete')}
                </NuwaButton>
              </PopoverTrigger>
              <PopoverContent>
                <Button 
                  className="w-full font-semibold" 
                  size="sm" 
                  color="danger"
                  onClick={() => {
                    setCharaListItem(charaListItem.chara.data.alternate_greetings.filter((_, i) => i !== index)  )
                    setDeleteCount(deleteCount + 1);
                  }}
                >    
                  {t('Previews.mymindismadeup')}
                </Button>
              </PopoverContent>
            </Popover>
            <NuwaButton
              shadowghost="black"
              className="mb-2 w-full"
              onClick={() => {
                setCharaListItem(charaListItem.chara.data.alternate_greetings.filter((_, i) => i !== index)  )
                setDeleteCount(deleteCount + 1);
              }}
                >
                  {t('Character.insertuserorchardelete')}
            </NuwaButton>
            <InsertUserOrChar
              getTextRef={()=>{return descTextareaRefs.current[index] as any}}
              onDone={(newValue) => {
                updateAlternateGreetings(newValue, index);
              }} />
          </div>
        </div>
      ))}
      <div className="flex flex-row-reverse mt-2">
        
        <Button onClick={handleAddGreetingsClick} variant="ghost" className="w-full h-20 border-dashed border border-zinc-800"><PlusIcon className="h-32 w-32 text-black"/></Button>  
      </div>   
    </div>
  );
}

export default InforMation_AlternateGreetings;
