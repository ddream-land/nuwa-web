"use client"

import React, { useState } from "react";
import { getWorldBookList, pushWorldBookList } from "../../_lib/utils";
import { useTranslations } from "next-intl";
import { TrashIcon } from "@heroicons/react/24/outline";
import { Button, Popover, PopoverContent, PopoverTrigger } from "@nextui-org/react";
import { PencilSquareIcon } from "@heroicons/react/24/outline";
import WorldBookEdit from "./WorldBookEdit";
import { TypeWorldBookItem, TypeWorldBookList } from "../../_lib/definitions";
import WorldBookCreate from "./WorldBookCreate";
import WorldBookItem from "./WorldBookItem"

export default function WorldBookList() {
  const t = useTranslations();

  const initWorldBookList = getWorldBookList();
  const [ worldBookList, setWorldBookList ] = useState<TypeWorldBookList>(initWorldBookList);
  const [ editWorldBook, setEditWorldBook ] = useState<TypeWorldBookItem>();

  const deleteWorldBook = ({index}: {index: number}) => {
    const newWorldBookList = worldBookList.filter((_, i) => i !== index);
    pushWorldBookList(newWorldBookList);
    setWorldBookList(newWorldBookList);
  }

  return (
    <>
      <div className="relative bg-white h-full w-full pb-40 rounded-[40px] min-h-[80vh]">
        <div className="flex flex-row justify-end mt-2 z-40 mr-8">
          <WorldBookCreate
            onCreateDone={(newWorldBook) => {
              setWorldBookList(getWorldBookList());
              setEditWorldBook(newWorldBook);
            }} />
        </div>

        <div className="px-7">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-3 3xl:grid-cols-4 3xl:grid-cols-4 gap-4 py-10 px-7 overflow-visible h-auto">
            {worldBookList.map((worldBookItem, index) => (
              <div key={worldBookItem.uid} className="relative group w-auto h-[280px]">
                <WorldBookItem worldBookItem={worldBookItem.worldBook} />

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
                          deleteWorldBook({index})
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
                    onClick={() => {
                      setEditWorldBook(worldBookItem);
                    }}
                  ></Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <WorldBookEdit worldBook={editWorldBook} onDone={() => {
        setEditWorldBook(undefined);
        setWorldBookList(getWorldBookList());
      }} />
    </>
  );
}
