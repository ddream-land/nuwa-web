"use client";
import React, { useRef } from "react";
import { useTranslations, useLocale } from "next-intl";
import { PlayCircleIcon, PauseCircleIcon } from "@heroicons/react/24/outline";
import NuwaTTSIcon from "@/app/icons/NuwaTTSIcon";
import { Listbox, ListboxItem } from "@nextui-org/react";
import { TypeVoiceName, TypeVoiceNameList, TypeVoiceType, voiceSex } from "@/app/lib/definitions.voice";

function classNames(...classes:any) {
  return classes.filter(Boolean).join(' ')
}
import PreviewTitle from "./PreviewTitle";
import PreviewWrapper from "./PreviewWrapper";
import { useCharaListItem } from "@/app/contexts/CharasContextProvider";
import { enVoices, zhCnVoices } from "../character/Voice";


function Preview_Voice() {
  const locale = useLocale();
  const charaListItem = useCharaListItem();
  const { chara } = charaListItem;
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlay, setIsPlay] = React.useState({name: '', isPlay: false} as {name: string, isPlay: boolean});
  const t = useTranslations();
  const voiceList = locale === 'en' ? enVoices : zhCnVoices;

  const [selectedVoiceType, setSelectedVoiceType] = React.useState<TypeVoiceType>(chara.data.extensions.nuwa_voice?.type as TypeVoiceType || TypeVoiceType.None);
  
  const [selectedVoiceSex, setSelectedVoiceSex] = React.useState<voiceSex>(chara.data.extensions.nuwa_voice?.sex as voiceSex || voiceSex.Male);
  const [selectedVoiceName, setSelectedVoiceName] = React.useState<string>(chara.data.extensions.nuwa_voice?.name || '');

  const voiceListExist = voiceList[selectedVoiceSex].filter((item) => (item.value === selectedVoiceName));

  return (
    <div>   
      <PreviewTitle>{t('Character.voice')}</PreviewTitle>
      <div className="">
        <PreviewWrapper>
          <div className="w-full h-full flex flex-row items-center justify-between py-5 px-16">
            <div
              className={classNames('flex flex-col items-center justify-center border border-neutral-400 border-opacity-50 cursor-pointer w-[174px] h-[206px] rounded-[14px]', (
                selectedVoiceType === TypeVoiceType.Nuwa ? 'bg-black': 'bg-white'
              ))}
            >
              <NuwaTTSIcon
                className={classNames('h-32 w-32', selectedVoiceType === TypeVoiceType.Nuwa ? 'fill-white' : 'fill-black')}
                aria-hidden="true"
                />
              <div className={classNames('text-center text-base font-normal leading-[29px] tracking-tight', (
                selectedVoiceType === TypeVoiceType.Nuwa ? 'text-white' : 'text-stone-950'
              ))} >Nuwa TTS API</div>
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
                  <ListboxItem 
                      classNames={{
                        "base": classNames("w-[356px] h-[62px] text-end rounded-full px-4 hadow border border-black bg-no-repeat bg-center", "text-white bg-black  bg-[url('/character-voice-selected-bg.png')]"),
                        "title": classNames('text-[18px] font-semibold leading-[29px] tracking-tight text-white')
                      }}
                      shouldHighlightOnFocus={false}
                      value={selectedVoiceName}
                      key={selectedVoiceName}
                      startContent={voiceListExist.length > 0 && (
                        <>
                          {(isPlay.name === voiceListExist[0].value && isPlay.isPlay) ? (
                            <PauseCircleIcon
                              className={classNames('h-8 w-8 font-black', (
                                selectedVoiceName === voiceListExist[0].value ? 'text-white' : 'text-black'
                              ))}
                              aria-hidden="true"
                              onClick={() => {
                                (audioRef.current as any).src = voiceListExist[0].audio;
                                (audioRef.current as any).pause();
                                setIsPlay({
                                  name: voiceListExist[0].value,
                                  isPlay: false
                                })
                              }}
                            />
                          ) : (
                            <PlayCircleIcon
                              className={classNames('h-8 w-8 font-black', (
                                selectedVoiceName === voiceListExist[0].value ? 'text-white' : 'text-black'
                              ))}
                              aria-hidden="true"
                              onClick={() => {
                                (audioRef.current as any).src = voiceListExist[0].audio;
                                (audioRef.current as any).play();
                                setIsPlay({
                                  name: voiceListExist[0].value,
                                  isPlay: true
                                })
                              }}
                            />
                          )}
                        </>
                      )}
                    >
                      {selectedVoiceName}
                    </ListboxItem>
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
