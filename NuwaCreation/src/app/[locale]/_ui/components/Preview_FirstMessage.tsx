"use client";
import React, { useState } from "react";
import { useChara } from "../../_lib/utils";
import { useTranslations } from "next-intl";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import PreviewTitle from "../components/PreviewTitle";
import PreviewWrapper from "../components/PreviewWrapper";

function Preview_PristMessage() {
  const t = useTranslations();
  const { chara , setChara } = useChara();
  const [first_messageValue, setFirst_MessageValue] = React.useState(chara.data.first_mes);
  const [alternate_greetings, setAlternate_greetings] = React.useState(chara.data.alternate_greetings);

  const [swiperRef, setSwiperRef] = useState(null);
  const [swiperActiveIndex, setSwiperActiveIndex] = useState(0);


  const msgList = [first_messageValue, ...alternate_greetings]
  
  function classNames(...classes:any) {
    return classes.filter(Boolean).join(' ')
  }

  return (
    <div>   
      <PreviewTitle>{t('Character.firstmessage')}</PreviewTitle>
      <div className="h-[162px]">
        <PreviewWrapper>
          <div className="w-full h-full flex flex-row items-center justify-between">

            <div className="mx-8 w-12 h-12 bg-neutral-500 rounded-full flex-shrink-0" />
            <div className="overflow-hidden h-full">
            <Swiper
              spaceBetween={50}
              slidesPerView={1}
              onSlideChange={(swiper) => {
                setSwiperActiveIndex(swiper.activeIndex);
                console.log('slide change')
              }}
              onSwiper={(swiper) => {
                setSwiperActiveIndex(swiper.activeIndex);
                setSwiperRef(swiper as any)
              }}
              className="h-full"
            >
              {msgList.map((item, index) => {
                return (
                  <SwiperSlide key={index}>
                    <div className="h-full flex items-center">
                      <div className="break-words w-full max-w-full overflow-hidden text-ellipsis line-clamp-5">{item}</div>
                    </div>
                  </SwiperSlide>
                )
              })}
            </Swiper>

            </div>
            <div className="w-[239px] h-[122px] bg-black rounded-[30px] mx-4 px-6 pt-7 flex-shrink-0">
              
              <div className="flex flex-row justify-between">
                <ChevronLeftIcon
                  className={classNames(
                    swiperActiveIndex === 0
                      ? 'text-stone-500'
                      : 'text-white',
                    'cursor-pointer h-14 text-stone-500 hover:text-slate-300'
                  )}
                  onClick={() => {
                    (swiperRef as any).slidePrev()
                  }}
                />
                <ChevronRightIcon
                  className={classNames(
                    swiperActiveIndex === msgList.length - 1
                      ? 'text-stone-500'
                      : 'text-white',
                    'cursor-pointer h-14 text-stone-500 hover:text-slate-300'
                  )}
                  onClick={() => (swiperRef as any).slideNext()}
                />
              </div>
              
              <div className="col-span-2 w-full h-7 text-white text-base font-light leading-[29px] tracking-tight text-center">{swiperActiveIndex + 1}/{msgList.length}</div>
            </div>
          </div>
        </PreviewWrapper>
      </div>
    </div>
  );
}

export default Preview_PristMessage;
