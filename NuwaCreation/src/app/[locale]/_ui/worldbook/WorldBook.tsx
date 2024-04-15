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
import NuwaTextareaWrapper from "../components/NuwaTextareaWrapper";
import { isEmpty } from "lodash-es";
import NuwaRadioWrapper from "../components/NuwaRadioWrapper";
import NuwaFormWrapper from "../components/NuwaFormWrapper";
import { PlusCircleIcon, XMarkIcon } from "@heroicons/react/24/solid";
import NuwaButton from "../components/NuwaButton";
import { TypeCharacterBook, TypeCharacterBookEntriy } from "../../_lib/definitions";

export default function WorldBook() {
  const t = useTranslations();
  const { character_book, setCharacter_Book } = useCharacterBook();
  const [isDeletePopoverOpen, setIsDeletePopoverOpen] = React.useState(false);
  const [selectedEntry, setSelectedEntry] = React.useState(character_book?.entries[0]);

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
    if (selectedEntry.id === id) {
      setSelectedEntry(character_book?.entries[0])
    }
  };

  const handleAddNewBookClick = () => {
    // Determine the next available id and display_index based on existing entries
    let nextId = (character_book.entries || []).length + 1;
    // if(character_book.entries[character_book.entries.length - 1].id >= nextId) {
    //   nextId = character_book.entries[character_book.entries.length - 1].id + 1;
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
    isEmpty(selectedEntry) && setSelectedEntry(character_book?.entries[0])
  }, [character_book])
  // const selectedValue = React.useMemo(
  //   () => Array.from(selectedEntry).join(", "),
  //   [selectedEntry]
  // );
  
  return (
    <>
      <div>
        <div className="flex flex-row">
          
          <div className="relative flex flex-col shrink-0 gap-y-4 w-[200px] bg-[#D9D9D9]/30 rounded-[14px] py-12 mt-32 -mr-2 h-[570px] pl-1">
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
            {character_book.entries?.map((entry) => (
              <NuwaButton
                key={`${entry.id}`}
                className={`${
                  selectedEntry.id === entry.id ? "h-12" : "h-7"
                } w-full rounded-l-[12px] bg-black text-white flex justify-center items-center cursor-pointer`}
                onClick={() => {
                  setSelectedEntry(entry);
                }}
                endContent={
                  <Popover key={`${entry.id}-${character_book?.entries.length}`} placement="top" color="warning">
                  <PopoverTrigger>
                    <Button className="h-4 w-4 bg-transparent" size="sm" isIconOnly>
                      <XMarkIcon className="h-4 w-4 text-white" />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent>
                    <div className="px-1 py-2">
                      <Popover placement="top" color="warning">
                        <PopoverTrigger>
                          <Button size="sm" color="warning">
                            {t('Greetings.thisoperationcannotbewithdrawn')}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent>
                          <Popover placement="top" color="danger">
                            <PopoverTrigger>
                              <Button size="sm" color="warning">
                                {t('Previews.mymindismadeup')}
                              </Button>
                            </PopoverTrigger>
                            <PopoverContent>
                              <Button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleDeleteButtonClick(entry.id)
                                }}
                                size="sm"
                                color="danger"
                              >
                                {t('WorldBook.delete')}
                              </Button>
                            </PopoverContent>
                          </Popover>
                        </PopoverContent>
                      </Popover>
                    </div>
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
                value={character_book.name}
                onChange={(e) => {
                  const newValue = e.target.value;
                  setCharacter_Book((prevChara) => ({
                    ...prevChara,
                    name: newValue,
                  }))
                }}
                className="w-full h-full bg-transparent outline-none"
              />
            </div>
            {character_book?.entries.map((entrys) => (
              <div key={`${entrys.id}`}>
                {selectedEntry.id === entrys.id && (
                <div className="grid grid-cols-2 gap-y-4 gap-x-4">
                  <div className="h-[620px] rounded-[40px] bg-white flex flex-col divide-y">
                    <div className="grow">
                      <NuwaTextareaWrapper
                        label={t('WorldBook.titlememo')}
                        textareaProps={{
                          value: entrys.comment,
                          onChange: (e: { target: { value: any; }; }) => (
                            setCharacter_Book((prevChara) => ({
                              ...prevChara,
                              entries: (prevChara.entries || []).map((entry) =>
                                entry.id === entrys.id
                                  ? { ...entry, comment: e.target.value }
                                  : entry
                              ),
                            })
                          ))
                        }}
                      >
                      </NuwaTextareaWrapper>
                    </div>
                    <div className="grow">
                      <NuwaTextareaWrapper
                        label={t('WorldBook.content')}
                        textareaProps={{
                          value: entrys.content,
                          onChange: (e: { target: { value: any; }; }) => (
                            setCharacter_Book((prevChara) => ({
                              ...prevChara,
                              entries: (prevChara.entries || []).map((entry) =>
                                entry.id === entrys.id
                                  ? { ...entry, content: e.target.value }
                                  : entry
                              ),
                            })
                          ))
                        }}
                      >
                      </NuwaTextareaWrapper>
                    </div>
                    <div className="grow">
                      <NuwaTextareaWrapper
                        label={t('WorldBook.primarykeywords')}
                        textareaProps={{
                          value: entrys.keys,
                          onChange: (e: { target: { value: any; }; }) => (
                            setCharacter_Book((prevChara) => ({
                              ...prevChara,
                              entries: (prevChara.entries || []).map((entry) =>
                                entry.id === entrys.id
                                  ? { ...entry, keys: e.target.value }
                                  : entry
                              ),
                            })
                          ))
                        }}
                      >
                      </NuwaTextareaWrapper>
                    </div>
                  </div>
                  <div className="h-[620px] rounded-[40px] bg-white flex flex-col divide-y">
                    <div className="grow">
                      <NuwaTextareaWrapper
                        label={t('WorldBook.optionalfilter')}
                        textareaProps={{
                          value: entrys.secondary_keys,
                          onChange: (e: { target: { value: any; }; }) => (
                            setCharacter_Book((prevChara) => ({
                              ...prevChara,
                              entries: (prevChara.entries || []).map((entry) =>
                                entry.id === entrys.id
                                  ? { ...entry, secondary_keys: e.target.value }
                                  : entry
                              ),
                            })
                          ))
                        }}
                      >
                      </NuwaTextareaWrapper>
                    </div>
                    <div className="grow">
                      <NuwaFormWrapper
                        label={<div className="flex flex-row justify-between">
                          <div>{t('WorldBook.orfer')}</div><div>{t('WorldBook.depth')}</div>
                        </div>}
                      >
                        <div className="flex flex-row justify-between">
                          <input
                            className="grow border-none outline-none "
                            color="primary"
                            autoComplete="off"
                            value={entrys.insertion_order as number}
                            onChange={(e) =>
                              setCharacter_Book((prevChara: any) => ({
                                ...prevChara,
                                entries: (prevChara.entries || []).map((entry: { id: Number; }) =>
                                  entry.id === entrys.id
                                    ? { ...entry, insertion_order: e.target.value }
                                    : entry
                                ),
                              }))
                            }
                            type="number"
                            max={1000}
                            min={0}
                            step={1}
                          />
                          <input
                            className="grow border-none outline-none text-right"
                            autoComplete="off"
                            value={entrys.extensions.depth as number}
                            onChange={(e) =>
                              setCharacter_Book((prevChara: any) => ({
                                ...prevChara,
                                entries: (prevChara.entries || []).map((entry: { id: Number; extensions: any; }) =>
                                  entry.id === entrys.id
                                    ? { ...entry, extensions: { ...entry.extensions, depth: e.target.value } }
                                    : entry
                                ),
                              }))
                            }
                            type="number"
                            max={4}
                            min={0}
                            step={1}
                          />
                        </div>
                      </NuwaFormWrapper>
                    </div>
                    <div className="grow">
                      <NuwaRadioWrapper
                        label={t('WorldBook.position')}
                        radioList={[
                          {
                            value: '1',
                            name: t('WorldBook.beforechar'),
                          },
                          {
                            value: '2',
                            name: t('WorldBook.afterchar'),
                          },
                          {
                            value: '3',
                            name: t('WorldBook.berforean'),
                          },
                          {
                            value: '4',
                            name: t('WorldBook.afteran'),
                          },
                          {
                            value: '5',
                            name: t('WorldBook.D'),
                          },
                        ]}
                        radioProps={{
                          value: String(entrys.extensions.position),
                          onChange: (e: { target: { value: any; }; }) => (
                            setCharacter_Book((prevChara) => ({
                              ...prevChara,
                              entries: (prevChara.entries || []).map((entry) =>
                                entry.id === entrys.id
                                  ? { ...entry, extensions: { ...entry.extensions, position: Number(e.target.value)  } }
                                  : entry
                              ),
                            }))
                          )
                        }}
                      >
                      </NuwaRadioWrapper>
                    </div>
                    <div className="grow">
                      <NuwaRadioWrapper
                        label={t('WorldBook.status')}
                        radioList={[
                          {
                            value: 'true',
                            name: t('WorldBook.constan'),
                          }, 
                          {
                            value: 'false',
                            name: t('WorldBook.normal'),
                          }
                        ]}
                        radioProps={{
                          value: String(entrys.constant),
                          onChange: (e: { target: { value: string; }; }) => (
                            setCharacter_Book((prevChara) => ({
                              ...prevChara,
                              entries: (prevChara.entries || []).map((entry) =>
                                entry.id === entrys.id
                              ? { ...entry, constant: Boolean(e.target.value === 'true') }
                                  : entry
                              ),
                            }))
                          )
                        }}
                      >
                      </NuwaRadioWrapper>
                    </div>
                  </div>
                </div>
              )}
              </div>
            ))}
            
          </div>
        </div>
      </div>
    </>
  );
}
