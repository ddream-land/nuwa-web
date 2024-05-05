"use client";
import React, { useEffect, useRef } from "react";
import { useTranslations, useMessages } from "next-intl";
import { PlayCircleIcon, PauseCircleIcon } from "@heroicons/react/24/outline";
import MicrosoftTTSIcon from "@/app/icons/MicrosoftTTSIcon";
import { Listbox, ListboxItem } from "@nextui-org/react";
import { TypeVoiceName, TypeVoiceNameList, TypeVoiceType, voiceSex } from "@/app/lib/definitions.voice";

function classNames(...classes:any) {
  return classes.filter(Boolean).join(' ')
}
import PreviewTitle from "./PreviewTitle";
import PreviewWrapper from "./PreviewWrapper";
import { useCharaListItem } from "@/app/contexts/CharasContextProvider";


function Preview_Voice() {
  const charaListItem = useCharaListItem();
  const { chara } = charaListItem;
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlay, setIsPlay] = React.useState({name: '', isPlay: false} as {name: string, isPlay: boolean});
  const t = useTranslations();
  const messages = useMessages();
  const { Voices } = messages;
  const initVoiceNameList = Voices;

  const [selectedVoiceType, setSelectedVoiceType] = React.useState<TypeVoiceType>(chara.data.extensions.voice?.type as TypeVoiceType || TypeVoiceType.None);
  
  const [selectedVoiceSex, setSelectedVoiceSex] = React.useState<voiceSex>(chara.data.extensions.voice?.sex as voiceSex || voiceSex.Male);
  const [selectedVoiceName, setSelectedVoiceName] = React.useState<string>(chara.data.extensions.voice?.name || '');

  const [voiceNameList, setVoiceNameList] = React.useState<TypeVoiceNameList>(initVoiceNameList as unknown as TypeVoiceNameList);

  
  return (
    <div>   
      <PreviewTitle>{t('Character.voice')}</PreviewTitle>
      <div className="">
        <PreviewWrapper>
          <div className="w-full h-full flex flex-row items-center justify-between py-5 px-16">
            <div
              className={classNames('flex flex-col items-center justify-center border border-neutral-400 border-opacity-50 cursor-pointer w-[174px] h-[206px] rounded-[14px]', (
                selectedVoiceType === TypeVoiceType.Microsoft ? 'bg-black': 'bg-white'
              ))}
            >
              <MicrosoftTTSIcon
                className={classNames('h-32 w-32', selectedVoiceType === TypeVoiceType.Microsoft ? 'fill-white' : 'fill-black')}
                aria-hidden="true"
                />
              <div className={classNames('text-center text-base font-normal leading-[29px] tracking-tight', (
                selectedVoiceType === TypeVoiceType.Microsoft ? 'text-white' : 'text-stone-950'
              ))} >Microsoft TTS API</div>
            </div>


            {selectedVoiceType !== TypeVoiceType.None && (
              <div className="w-[356px]">
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
                  {voiceNameList[selectedVoiceSex].filter((item) => (item.value === selectedVoiceName)).map((item: TypeVoiceName) => {
                    return (
                      <ListboxItem 
                      classNames={{
                        "base": classNames("w-[356px] h-[62px] text-end rounded-full px-4 hadow border border-black bg-no-repeat bg-center", (
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
                            className={classNames('h-8 w-8 font-black', (
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
                            className={classNames('h-8 w-8 font-black', (
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
        </PreviewWrapper>
      </div>
    
    </div>
  );
}

export default Preview_Voice;
