"use client";
import React, { useState, useRef, useEffect, RefObject, MutableRefObject } from "react";
import { useTranslations } from "next-intl";
import { TypeWorldBookEntriy } from "@/app/lib/definitions";
import { useWorldBookItem, useWorldBookItemDispatch } from "./WorldBookContext";
import { Input } from "@nextui-org/react";
import PencilEditIcon from "@/app/icons/PencilEditIcon";

function WorldBook_Title() {
  const t = useTranslations();
  const [isEdit, setIsEdit] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const worldBookItem = useWorldBookItem();
  const worldBookItemDispatch = useWorldBookItemDispatch();

  const setWorldBookItemName = (newValue:string) => {
    worldBookItemDispatch({
      type: "changed",
      payload: {
        ...worldBookItem,
        worldBook: {
          ...worldBookItem?.worldBook,
          name: newValue
        }
      },
    })
  }

  useEffect(() => {
    if (isEdit) {
      inputRef.current?.focus();
    }
  }, [isEdit])

  return (
    <div className="group w-full flex flex-row justify-center h-14">
      {/* <div className="flex flex-row items-center justify-center">
        <div>{worldBookItem?.worldBook.name}</div>
        <PencilEditIcon className="text-2xl text-default-400 pointer-events-none flex-shrink-0 fill-black" /> 
      </div> */}
      <Input
        ref={inputRef}
        value={worldBookItem?.worldBook.name}
        variant="underlined"
        onChange={(e) => {
          const newValue = e.target.value;
          setWorldBookItemName(newValue);
        }}
        onBlur={() => setIsEdit(false)}
        size="sm"
        classNames={{
          label: "",
          input: "",
          innerWrapper: "bg-transparent",
          inputWrapper: "shadow-none",
        }}
        className={`w-full h-full px-10 bg-transparent outline-none disabled:bg-transparent ${isEdit ? 'block' : 'hidden'}`}
      />
      <div
        className={`h-full flex-row items-center gap-2 overflow-hidden ${isEdit ? 'hidden' : 'flex'}`}
        onClick={() => {
          setIsEdit(true);
        }}
      >
        <div className="overflow-hidden whitespace-nowrap text-overflow-ellipsis">{worldBookItem?.worldBook.name}</div>
        <PencilEditIcon className="h-12 text-2xl text-default-400 pointer-events-none flex-shrink-0 " />
      </div>
    </div>
    
  );
}

export default WorldBook_Title;
