"use client";
import React, { RefObject, useEffect, useRef, useState } from "react";
import {
  Button,
  Input,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Tab,
  Tabs,
} from "@nextui-org/react";
import { defaultWorldBookEntry, uuid } from "@/app/lib/utils";
import { useTranslations } from "next-intl";
import { clone, isNull } from "lodash-es";
import { TypeWorldBook, TypeWorldBookEntriy } from "@/app/lib/definitions";
import WorldBook_Entry from "./WorldBook_Entry";
import { useWorldBookItem, useWorldBookItemDispatch } from "./WorldBookContext";
import { PlusCircleIcon, XMarkIcon } from "@heroicons/react/24/outline";

export default function WorldBook({worldBooka, isPreview = false}: {
  worldBooka?: TypeWorldBook | undefined,
  isPreview?: boolean,
}) {
  const tabsRef = useRef<any>(null);
  const t = useTranslations();
  const worldBookItem = useWorldBookItem();
  const worldBook = isPreview ? worldBooka : worldBookItem.worldBook;
  let latestWorldBook = useRef(worldBook);
  const uid = isPreview ? worldBooka?.name : worldBookItem.uid;
  const worldBookItemDispatch = useWorldBookItemDispatch();
  const titleInputRefs = useRef<{ [key: string]: RefObject<HTMLInputElement> | null }>({});
  const [editEntryUid, setEditEntryUid] = useState<string | undefined>(undefined);

  let initSelectedEntry = undefined;

  if (worldBook?.entries && Object.keys(worldBook.entries).length > 0) {
    initSelectedEntry = worldBook.entries[Object.keys(worldBook.entries)[0]] 
  }
  const [selectedEntry, setSelectedEntry] = useState(initSelectedEntry);

  const handleDeleteButtonClick = (id: any) => {
    // Implement the logic to delete the entry with the given id
    setWorldBookItemDeleteEntries(id);
    if (selectedEntry?.uid === id) {
      setSelectedEntry(worldBook?.entries[Object.keys(worldBook?.entries)[0]])
    }
  };

  const handleAddNewBookClick = () => {
    const uid = uuid();
    let newEntry = clone(defaultWorldBookEntry);
    newEntry.uid = uid;
    newEntry.extensions.display_index = uid;
    newEntry.comment = t("WorldBook.untitledbookEntry")

    setWorldBookItemInNewEntries(newEntry)
  };
  

  useEffect(() => {
    if (!worldBook?.entries || Object.keys(worldBook?.entries).length === 0) {
      latestWorldBook.current = worldBook
      return
    }
    if (isNull(selectedEntry)) {
      Object.keys(worldBook.entries).length > 0 && setSelectedEntry(worldBook?.entries[0])
    }

    // 选择新添加的
    if (latestWorldBook?.current && latestWorldBook?.current.entries) {
      if (Object.keys(worldBook.entries).length > Object.keys(latestWorldBook?.current.entries).length) {
        const keys = Object.keys(worldBook?.entries);
        const length = keys.length;
        const key = keys[length - 1]
        const newEntry = worldBook?.entries[key];
        setSelectedEntry(newEntry)
        tabsRef.current.scrollLeft = tabsRef.current.scrollWidth
      }
    }
    latestWorldBook.current = worldBook
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
  const setWorldBookItemInNewEntries = (newValue:TypeWorldBookEntriy) => {
    worldBookItemDispatch({
      type: "changed",
      payload: {
        ...worldBookItem,
        worldBook: {
          ...worldBook,
          entries: {
            ...worldBook?.entries,
            [newValue.uid]: newValue
          }
        }
      },
    })
  }
  const setWorldBookItemDeleteEntries = (key: string) => {

    delete worldBook?.entries[key];

    // const newEntriesArray = map(worldBook, (value, key) => {
    //   return {value};
    // })

    // const newEntries = keyBy(newEntriesArray, "id");


    // const updatedEntries = (worldBook?.entries || []).filter(
    //   (entry) => entry.uid !== entryId
    // );

    // Update ids and display_index in sequential order
    // const updatedEntriesWithIds = updatedEntries.map((entry, index) => ({
    //   ...entry,
    //   id: index + 1,
    //   extensions: {
    //     ...entry.extensions,
    //     display_index: index + 1,
    //   },
    // }));
    
    worldBookItemDispatch({
      type: "changed",
      payload: {
        ...worldBookItem,
        worldBook: {
          ...worldBook,
        }
      },
    })
  }
  
  return (
    <>
      <div className="relative">
        {!isPreview && (
          <div className="h-10 w-20 flex flex-row justify-center bg-white p-0 z-40 absolute top-0 right-0 pb-2">
            <Button
              onClick={handleAddNewBookClick}
              className="bg-transparent"
              type="button"
              color="default"
              variant="flat"
              isIconOnly
            >
              <PlusCircleIcon className="h-8 w-8" aria-hidden="true" />
            </Button>
          </div>
        )}
      </div>
      {(!worldBook || !worldBook.entries|| Object.keys(worldBook.entries).length === 0) && (
        <div className="h-40"></div>
      )}
      <Tabs
          aria-label="Options"
          variant="underlined"
          ref={tabsRef}
          selectedKey={selectedEntry?.uid}
          size="lg"
          keyboardActivation="manual"
          shouldSelectOnPressUp={false}
          classNames={{
            base: "sticky top-0 ml-0 z-30 overflow-x-scroll scrollbar-hide bg-white w-full h-full shrink-0",
            tabList: "overflow-x-scroll scrollbar-hide gap-10 py-0 border-b border-solid border-black/20 max-w-full pr-20 h-full",
            cursor: "w-full bg-[#0C0C0C] text-white",
            tab:"h-10 group-data-[selected=true]:bg-[#0C0C0C]",
            tabContent: "h-full group-data-[selected=true]:text-neutral-800 group-data-[selected=true]:font-bold",
            panel: "overflow-y-scroll scrollbar-hide",
          }}
        >

          {worldBook && worldBook.entries && Object.keys(worldBook.entries).map((key, index) => (
            <Tab
              key={key}
              id={uid}
              shouldSelectOnPressUp={false}
              title={
                <div className="flex flex-row items-center group justify-center">
                  {selectedEntry?.uid === worldBook.entries[key].uid ? (
                    <Popover
                      placement="top"
                      color="danger"
                      className=""
                      offset={-26}
                      onClose={() => {setEditEntryUid(undefined)}}
                      classNames={{
                        base: [  
                          // arrow color
                          "bg-transparent",
                          "border-none",
                        ],
                        content: [
                          "bg-transparent",
                          "border-none",
                          "shadow-none",
                          "p-0"
                        ],
                      }}
                    >
                      <PopoverTrigger>
                        <div
                          className={`truncate w-40 text-neutral-700`}
                          onClick={() => {
                            if (selectedEntry?.uid === worldBook.entries[key].uid) {
                              setEditEntryUid(worldBook.entries[key].uid)
                              const inputRef = titleInputRefs.current[worldBook.entries[key].uid];
                              inputRef?.current?.focus();
                            }
                          }}
                        >{worldBook.entries[key].comment}</div>
                      </PopoverTrigger>
                      <PopoverContent>  
                        <Input
                          ref={(r) => {
                            titleInputRefs.current[worldBook.entries[key].uid]= {
                              current: r,
                            };
                          }}
                          value={worldBook.entries[key].comment}
                          variant="flat"
                          onChange={(e) => {
                            const newWorldBook =  {
                              ...worldBook,
                              entries: {
                                ...worldBook.entries,
                                [key]: {
                                  ...worldBook.entries[key],
                                  comment: e.target.value
                                }
                              }
                            }
        
                            setWorldBookItem(newWorldBook)
                          }}
                          size="sm"
                          classNames={{
                            input: "h-6 bg-transparent",
                            innerWrapper: "h-6 py-0 bg-transparent",
                            inputWrapper: "h-6 py-0 shadow-none bg-white data-[hover=true]:bg-white group-data-[focus=true]:bg-white",
                          }}
                          className={`w-48 bg-transparent`}
                        />
                      </PopoverContent>
                    </Popover>
                  
                  ): (
                    <div
                      className={`truncate w-40 text-neutral-700`}
                      onClick={() => {
                        setSelectedEntry(worldBook.entries[key])
                      }}
                    >{worldBook.entries[key].comment}</div>
                  )}
                 
                  
                  {!isPreview && 
                    <Popover
                      placement="top"
                      color="danger"
                      className=""
                    >
                      <PopoverTrigger>
                        <Button className="opacity-0 group-hover:opacity-100 h-4 w-4 bg-transparent" size="sm" isIconOnly>
                          <XMarkIcon className="h-4 w-4 text-black" />
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent>  
                        <Button
                          className="font-semibold"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDeleteButtonClick(worldBook.entries[key].uid)
                          }}
                          size="sm"
                          color="danger"
                        >
                          {t('Previews.mymindismadeup')}
                        </Button>
                      </PopoverContent>
                    </Popover>
                  }
                </div>
              }
            >
              <div key={`${uid}${worldBook.entries[key].uid}`}>
                <WorldBook_Entry
                  value={worldBook.entries[key]}
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
                  }}
                />
              </div>
            </Tab>
          ))}
        </Tabs>
      
    </>
  );
}
