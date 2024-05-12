"use client"

import React, { useEffect, useRef } from "react";
import { useTranslations, useLocale } from "next-intl";
import { NoSymbolIcon, PlayCircleIcon, PauseCircleIcon } from "@heroicons/react/24/outline";
import NuwaTTSIcon from "@/app/icons/NuwaTTSIcon";
import { Divider, Listbox, ListboxItem, Tab, Tabs } from "@nextui-org/react";
import Image from "next/image";
import { TypeVoiceName, TypeVoiceNameList, TypeVoiceType, voiceSex } from "@/app/lib/definitions.voice";
import { useCharaListItem, useCharaListItemDispatch } from "@/app/contexts/CharasContextProvider";
import { textareaProps } from "../components/NuwaTextarea";

function classNames(...classes:any) {
  return classes.filter(Boolean).join(' ')
}

export const enVoices:TypeVoiceNameList = {
  "female": [
    { "name": "en-female-lisa", "value": "lisa","audio": "https://renwu-bucket.oss-cn-chengdu.aliyuncs.com/ExampleVoice/lisa20240424194411601689.wav"}
  ],
  "male": []
}

export const zhCnVoices:TypeVoiceNameList = {
  "female": [
    { "name": "中文-女-萝莉", "value": "qiqi","audio": "https://renwu-bucket.oss-cn-chengdu.aliyuncs.com/ExampleVoice/qiqi20240424195249598869.wav"},
    { "name": "中文-女-少女", "value": "youla","audio": "https://renwu-bucket.oss-cn-chengdu.aliyuncs.com/ExampleVoice/youla20240424195335821436.wav"}
  ],
  "male": [
    { "name": "中文-男-青年", "value": "shenli","audio": "https://renwu-bucket.oss-cn-chengdu.aliyuncs.com/ExampleVoice/shenli20240424194934724912.wav"},
    { "name": "中文-男-少年", "value": "kong","audio": "https://renwu-bucket.oss-cn-chengdu.aliyuncs.com/ExampleVoice/shenli20240424194934724912.wav"},
    { "name": "中文-男-大叔", "value": "zhongli","audio": "https://renwu-bucket.oss-cn-chengdu.aliyuncs.com/ExampleVoice/zhongli20240424195454356657.wav"}
  ]
}

export default function Voice() {
  const locale = useLocale();
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlay, setIsPlay] = React.useState({name: '', isPlay: false} as {name: string, isPlay: boolean});
  const t = useTranslations();
  const voiceList = locale === 'en' ? enVoices : zhCnVoices;
  const charaListItem = useCharaListItem();
  const charaListItemDispatch = useCharaListItemDispatch();

  const [selectedVoiceType, setSelectedVoiceType] = React.useState<TypeVoiceType>(charaListItem.chara.data.extensions.nuwa_voice?.type as TypeVoiceType || TypeVoiceType.None);
  let initSelectedVoiceSex:voiceSex = voiceSex.Female;
  if (charaListItem.chara.data.extensions.nuwa_voice?.sex && voiceList[charaListItem.chara.data.extensions.nuwa_voice?.sex as voiceSex].length > 0) {
    initSelectedVoiceSex = charaListItem.chara.data.extensions.nuwa_voice?.sex as voiceSex;
  }
  const [selectedVoiceSex, setSelectedVoiceSex] = React.useState<voiceSex>(initSelectedVoiceSex);
  const [selectedVoiceName, setSelectedVoiceName] = React.useState<string>(charaListItem.chara.data.extensions.nuwa_voice?.name || '');

  const setCharaListItem = (newValue: {
    type: string,
    sex: string,
    name: string
  } | null) => {
    charaListItemDispatch({
      type: "changed",
      payload: {
        ...charaListItem,
        chara: {
          ...charaListItem.chara,
          data: {
            ...charaListItem.chara.data,
            extensions: {
              ...charaListItem.chara.data.extensions,
              nuwa_voice: {
                version: 'v1',
                language: locale === 'zh-CN' ? 'zh-cn' : 'en',
                ...newValue
              }
            }
          }
        }
      },
    })
  }
  
  const handleSetSelectedVoiceType = (voiceType : TypeVoiceType) => {
    setSelectedVoiceType(voiceType)
    setCharaListItem(null);
  }

  useEffect(() => {
    // console.log(selectedVoiceName);
    setVoiceToChar();
  }, [selectedVoiceName]);

  const setVoiceToChar = () => {
    setCharaListItem({
      type: selectedVoiceType,
      sex: selectedVoiceSex,
      name: selectedVoiceName,
    })
  };
 

  return (
    <div className="grid grid-cols-1 gap-8 sm:grid-cols-10">
      <div className="sm:col-start-3 sm:col-end-9 grid gap-12">
        <div>
          <h2 className={`${textareaProps.classNames.label}`}>{t('Character.voicetab.voice')}</h2>
          <div className="text-stone-500 text-sm font-normal leading-none tracking-tight -mt-4">{t('Character.voicetab.desc')}</div>
          <div className="flex flex-row flex-wrap gap-[42px] mt-8">
            <div
              onClick={() => handleSetSelectedVoiceType(TypeVoiceType.None)}
              className={classNames('group hover:bg-black shrink-0 flex flex-col items-center justify-center border border-neutral-400 border-opacity-50 cursor-pointer w-[174px] h-[206px] rounded-[14px]', (
                selectedVoiceType === TypeVoiceType.None ? 'bg-black': 'bg-white'
              ))}
            >
              <NoSymbolIcon className={classNames('h-32 w-32  font-black group-hover:text-white', (
                selectedVoiceType === TypeVoiceType.None ? 'text-white' : 'text-stone-950'
              ))} aria-hidden="true" />
              <div className={classNames('text-center text-base font-normal leading-[29px] tracking-tight group-hover:text-white', (
                selectedVoiceType === TypeVoiceType.None ? 'text-white' : 'text-stone-950'
              ))} >{t('Character.none')}</div>
            </div>
            <div
              onClick={() => handleSetSelectedVoiceType(TypeVoiceType.Nuwa)}
              className={classNames('group hover:bg-black shrink-0 flex flex-col items-center justify-center border border-neutral-400 border-opacity-50 cursor-pointer w-[174px] h-[206px] rounded-[14px]', (
                selectedVoiceType === TypeVoiceType.Nuwa ? 'bg-black': 'bg-white'
              ))}
            >
              <NuwaTTSIcon
                className={classNames('w-32 group-hover:fill-white', (
                  selectedVoiceType === TypeVoiceType.Nuwa ? 'fill-white' : 'fill-stone-950'
                ))}
                aria-hidden="true"
              />
              <div className={classNames('text-center text-base font-normal leading-[29px] tracking-tight group-hover:text-white', (
                selectedVoiceType === TypeVoiceType.Nuwa ? 'text-white' : 'text-stone-950'
              ))} >Nuwa TTS API</div>
            </div>
            <div className="flex flex-col items-center justify-center w-[174px] h-[206px] ">
              <Image width={96} height={20} src="/character-voice-more.png" alt="" />
              <div className="text-center text-stone-950 text-base font-normal leading-[29px] tracking-tight">
                {t('Character.voicetab.more')}
              </div>
            </div>
          </div>
        </div>
        {selectedVoiceType !== TypeVoiceType.None && (
          <>
            <Divider className="my-4 px-2" />
            <div className="py-8">
              <div className={`${textareaProps.classNames.label}`}>{t('Character.voicetab.sex')}</div>
              <Tabs
                aria-label="Options"         
                selectedKey={selectedVoiceSex}
                onSelectionChange={(key) => setSelectedVoiceSex(key as voiceSex)}
                classNames={{
                  base: "",
                  tabList: "w-[313px] h-[62px] bg-black rounded-[17px] justify-center",
                  
                  tab:"w-[136px] h-[35px] bg-black rounded-[10px] group-data-[selected=true]:bg-white",
                  tabContent: "text-zinc-800 text-white group-data-[selected=true]:text-black",
                }}
              >
                  <Tab key={voiceSex.Male} title={t(`Character.voicetab.${voiceSex.Male}`)} />
                  <Tab key={voiceSex.Female} title={t(`Character.voicetab.${voiceSex.Female}`)} />
              </Tabs>
            </div>
            <div className="py-8">
              <div className={`${textareaProps.classNames.label}`}>{t('Character.voicetab.type')}</div>
              <div  className="w-[260px] px-1 py-2">
                <Listbox 
                  aria-label="Single selection example"
                  variant="light"
                  hideSelectedIcon={true}
                  shouldHighlightOnFocus={false}
                  disallowEmptySelection
                  selectionMode="single"
                  selectedKeys={selectedVoiceName}
                  classNames={{
                    list: 'gap-4 w-auto'
                  }}
                  onSelectionChange={(key : any) => {
                    setSelectedVoiceName(key.currentKey)
                  }}
                >
                  {voiceList[selectedVoiceSex].map((item: TypeVoiceName) => {
                    return (
                      <ListboxItem 
                        classNames={{
                          "base": classNames("w-[356px] h-[62px] text-end rounded-full px-4 shadow border border-black bg-no-repeat bg-center hover:border-2 hover:border-black", (
                            selectedVoiceName === item.value ? "text-white bg-black  bg-[url('/character-voice-selected-bg.png')]" : 'text-black bg-white'
                          )),
                          "title": classNames('text-[18px] font-semibold leading-[29px] tracking-tight', (
                            selectedVoiceName === item.value ? 'text-white' : 'text-black'
                          ))
                        }}
                        shouldHighlightOnFocus={false}
                        key={item.value}
                        value={item.value}
                        startContent={
                          ((isPlay.name === item.value && isPlay.isPlay) ? (
                            <PauseCircleIcon
                              className={classNames('h-8 w-8 font-black group-data-[hover=true]:text-white', (
                                selectedVoiceName === item.value ? 'text-white' : 'text-black'
                              ))}
                              aria-hidden="true"
                              onClick={() => {
                                (audioRef.current as any).src = item.audio;
                                (audioRef.current as any).pause();
                                setIsPlay({
                                  name: item.value,
                                  isPlay: false
                                })
                              }}
                            />
                          ) : (
                            <PlayCircleIcon
                              className={classNames('h-8 w-8 font-black hover:text-white', (
                                selectedVoiceName === item.value ? 'text-white' : 'text-black'
                              ))}
                              aria-hidden="true"
                              onClick={() => {
                                (audioRef.current as any).src = item.audio;
                                (audioRef.current as any).play();
                                setIsPlay({
                                  name: item.value,
                                  isPlay: true
                                })
                              }}
                            />
                          ))
                        }
                      >
                      {item.name}
                    </ListboxItem>
                    )
                  })}
                </Listbox>
              </div>
            </div>
          </>
        )}
      
        <audio
          ref={audioRef}
          preload="none"
          onPause={() => {
            setIsPlay({
              name: '',
              isPlay: false
            })
          }}
        />
      </div>
    </div>
  );
}
