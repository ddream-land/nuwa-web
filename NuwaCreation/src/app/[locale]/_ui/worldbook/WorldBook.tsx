"use client";
import React, { useEffect, useRef } from "react";
import {
  Button,
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@nextui-org/react";
import { useCharacterBook } from "../../_lib/utils";
import { useTranslations } from "next-intl";
import { isEmpty, isNull } from "lodash-es";
import { PlusCircleIcon, XMarkIcon } from "@heroicons/react/24/solid";
import NuwaButton from "../components/NuwaButton";
import { TypeCharacterBook, TypeCharacterBookEntriy } from "../../_lib/definitions";
import WorldBook_Entry from "./WorldBook_Entry";

export default function WorldBook({characterBook, isPreview = false}: {
  characterBook?: TypeCharacterBook | undefined,
  isPreview?: boolean,
}) {
  const t = useTranslations();
  const { character_book, setCharacter_Book } = useCharacterBook();
  const displayCharaterBook =characterBook || character_book;

  let initSelectedEntry = null;

  if (displayCharaterBook?.entries && displayCharaterBook?.entries.length > 0) {
    initSelectedEntry = displayCharaterBook.entries[0] 
  }
  const [selectedEntry, setSelectedEntry] = React.useState(initSelectedEntry);

  const handleDeleteButtonClick = (id: any) => {
    // Implement the logic to delete the entry with the given id
    setCharacter_Book((prevChara) => {
      const updatedEntries = (prevChara.entries || []).filter(
        (entry) => entry.id !== id
      );

      // Update ids and display_index in sequential order
      const updatedEntriesWithIds = updatedEntries.map((entry, index) => ({
        ...entry,
        id: index + 1,
        extensions: {
          ...entry.extensions,
          display_index: index + 1,
        },
      }));

      return {
        ...prevChara,
        entries: updatedEntriesWithIds,
      };
    });
    if (selectedEntry?.id === id) {
      setSelectedEntry(displayCharaterBook?.entries[0])
    }
  };

  const handleAddNewBookClick = () => {
    // Determine the next available id and display_index based on existing entries
    let nextId = (displayCharaterBook.entries || []).length + 1;
    // if(displayCharaterBook.entries[displayCharaterBook.entries.length - 1].id >= nextId) {
    //   nextId = displayCharaterBook.entries[displayCharaterBook.entries.length - 1].id + 1;
    // }
    const nextDisplayIndex = nextId;

    // Default template for new entries
    const defaultTemplate: TypeCharacterBookEntriy = {
      id: nextId,
      keys: [],
      secondary_keys: [],
      comment: "New Book",
      content: "",
      constant: true,
      selective: true,
      insertion_order: 100,
      enabled: true,
      position: "after_char",
      extensions: {
        position: 3,
        exclude_recursion: false,
        display_index: nextDisplayIndex,
        probability: 100,
        useProbability: true,
        depth: 4,
      },
    };

    setCharacter_Book((prevChara: TypeCharacterBook):TypeCharacterBook => ({
      ...prevChara,
      entries: [...(prevChara.entries || []), defaultTemplate],
    }));
    setSelectedEntry(defaultTemplate)

  };

  useEffect(() => {
    isNull(selectedEntry) && displayCharaterBook.entries && displayCharaterBook?.entries.length > 0 &&setSelectedEntry(displayCharaterBook?.entries[0])
  }, [displayCharaterBook])
  
  return (
    <>
      <div>
        <div className="flex flex-row">
          
          <div className="relative flex flex-col shrink-0 gap-y-4 w-[200px] bg-[#D9D9D9]/30 rounded-[14px] py-12 mt-32 -mr-2 h-[570px] pl-1">
            {!isPreview && (
              <Button
                onClick={handleAddNewBookClick}
                className="absolute top-2 right-4 bg-transparent p-0 z-40"
                type="button"
                color="default"
                variant="flat"
                isIconOnly
              >
                <PlusCircleIcon className="h-12 w-12" aria-hidden="true" />
              </Button>
            )}
            {displayCharaterBook.entries?.map((entry) => (
              <NuwaButton
                key={`${entry.id}`}
                className={`${
                  selectedEntry?.id === entry.id ? "h-12" : "h-7"
                } w-full rounded-l-[12px] bg-black text-white flex justify-center items-center cursor-pointer`}
                onClick={() => {
                  setSelectedEntry(entry);
                }}
                endContent={!isPreview &&
                  <Popover key={`${entry.id}-${displayCharaterBook?.entries.length}`} placement="top" color="warning">
                    <PopoverTrigger>
                      <Button className="h-4 w-4 bg-transparent" size="sm" isIconOnly>
                        <XMarkIcon className="h-4 w-4 text-white" />
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent>  
                      <Button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDeleteButtonClick(entry.id)
                        }}
                        size="sm"
                        color="warning"
                      >
                        {t('Previews.mymindismadeup')}
                      </Button>
                    </PopoverContent>
                  </Popover>
                }
              >
                <div className="mx-2 overflow-x-scroll">{entry.comment || t('WorldBook.untitledbook')}</div>
              </NuwaButton>
            ))}
          </div>
          <div className="grow z-40">
            <div
              className="-mb-9 pb-9 px-2 w-5/12 h-[132px] rounded-[40px] flex justify-center items-center bg-[#313131] text-white font-semibold text-[20px]"
            >
              <input
                value={displayCharaterBook.name}
                disabled={isPreview}
                onChange={(e) => {
                  const newValue = e.target.value;
                  setCharacter_Book((prevChara) => ({
                    ...prevChara,
                    name: newValue,
                  }))
                }}
                className="w-full h-full bg-transparent outline-none disabled:bg-transparent"
              />
            </div>
            {displayCharaterBook.entries && displayCharaterBook?.entries.map((entrys) => (
              <div key={`${entrys.id}`}>
                {selectedEntry?.id === entrys.id && (
                  <WorldBook_Entry
                    value={selectedEntry}
                    isPreview={isPreview}
                    onChange={(newSelectedEntry) => {
                      setCharacter_Book((prevChara) => {
                        const newCharaterBook =  {
                          ...prevChara,
                          entries: (prevChara.entries || []).map((item) =>
                            item.id === newSelectedEntry.id
                              ? newSelectedEntry
                              : item
                          ),
                        }
                        setSelectedEntry(newSelectedEntry);
                        return newCharaterBook;
                      })
                    }}
                  />
                )}
              </div>
            ))}
            
          </div>
        </div>
      </div>
    </>
  );
}
