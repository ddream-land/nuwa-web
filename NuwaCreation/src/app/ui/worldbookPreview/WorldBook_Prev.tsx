"use client";
import React, { useEffect } from "react";
import {
  Tooltip,
} from "@nextui-org/react";
import { useTranslations } from "next-intl";
import { isNull } from "lodash-es";
import NuwaButton from "../components/NuwaButton";
import { TypeWorldBook } from "@/app/lib/definitions";
import WorldBook_Entry from "./WorldBook_Entry";
import { useWorldBookItem, useWorldBookItemDispatch } from "../worldbook/WorldBookContext";

export default function WorldBook_Prev({worldBooka, isPreview = false}: {
  worldBooka?: TypeWorldBook | undefined,
  isPreview?: boolean,
}) {
  const t = useTranslations();
  const worldBookItem = useWorldBookItem();
  const worldBook = worldBooka;
  const uid = worldBooka?.name;
  const worldBookItemDispatch = useWorldBookItemDispatch();

  let initSelectedEntry = undefined;

  if (worldBook?.entries && Object.keys(worldBook.entries).length > 0) {
    initSelectedEntry = worldBook.entries[Object.keys(worldBook.entries)[0]] 
  }
  const [selectedEntry, setSelectedEntry] = React.useState(initSelectedEntry);

  useEffect(() => {
    isNull(selectedEntry) && worldBook?.entries && Object.keys(worldBook.entries).length > 0 &&setSelectedEntry(worldBook?.entries[0])
  }, [worldBook])

  const setWorldBookItem = (newValue:TypeWorldBook) => {
    worldBookItemDispatch({
      type: "changed",
      payload: {
        ...worldBookItem,
        worldBook: newValue
      },
    })
  }
  
  return (
    <>
      <div>
        <div className="flex flex-col">     
          <div
            className="z-10 -mb-9 pb-9 px-2 w-7/12 h-[132px] rounded-t-[40px] flex justify-center items-center bg-[#313131] text-white font-semibold text-[20px]"
          >
            
            <Tooltip classNames={{ content: [ "w-[80vh]"] }} color="primary" content={worldBook?.name || t('WorldBook.untitledbook')} className="text-lg">
              <div className="px-4 w-full bg-transparent outline-none disabled:bg-transparent truncate" >{worldBook?.name}</div>
            </Tooltip>
          </div>
          <div className="flex flex-row">
            <div className="relative flex flex-col shrink-0 gap-y-4 w-52 bg-[#D9D9D9]/30 rounded-xl pt-32 pb-12 -mr-2 h-[570px] pl-1">
            {worldBook && Object.keys(worldBook.entries).map((key) => (
              <NuwaButton
                key={`${uid}${worldBook.entries[key].uid}`}
                className={`${
                  selectedEntry?.uid === worldBook.entries[key].uid ? "h-12" : "h-7"
                }  w-full rounded-l-xl bg-black text-white flex justify-center items-center cursor-pointer`}
                onClick={() => {
                  setSelectedEntry(worldBook.entries[key]);
                }}
              >
                <Tooltip classNames={{ content: [ "w-[80vh]"] }} color="primary" content={worldBook.entries[key].comment || t('WorldBook.untitledbook')} className="text-lg">
                  <div
                    className="mx-2 w-full truncate"
                    onClick={() => {
                      setSelectedEntry(worldBook.entries[key]);
                    }}
                  >{worldBook.entries[key].comment || t('WorldBook.untitledbook')}</div>
                </Tooltip>
              </NuwaButton>
            ))}
          </div>
          <div className="grow z-40">
            {worldBook?.entries && Object.keys(worldBook.entries).map((key) => (
              <div key={`${uid}${worldBook.entries[key].uid}`}>
                {selectedEntry?.uid === worldBook.entries[key].uid && (
                  <WorldBook_Entry
                    value={selectedEntry}
                    isPreview={isPreview}
                    onChange={(newSelectedEntry) => {
                      const newWorldBook =  {
                        ...worldBook,
                        entries: {
                          ...worldBook.entries,
                          [newSelectedEntry.uid]: newSelectedEntry
                        }
                      }
                      setWorldBookItem(newWorldBook)
                      setSelectedEntry(newSelectedEntry);
                    }}
                  />
                )}
              </div>
            ))}
            
          </div>
          </div>
          
        </div>
      </div>
    </>
  );
}
