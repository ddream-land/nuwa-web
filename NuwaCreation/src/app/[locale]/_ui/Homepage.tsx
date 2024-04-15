"use client";
import { ChevronRightIcon } from "@heroicons/react/24/outline";
import React from "react";
import { Link } from "@/navigation";
import Image from "next/image";
import { useTranslations } from "next-intl";

function Homepage() {
  const t = useTranslations();
  return (
    <div className="mx-auto max-w-7xl pb-32 flex px-8 flex-col min-w-[1080px]">
      
      {/* <Link
        href="/character"
        className="rounded-md bg-amber-600 dark:bg-gray-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-amber-500 dark:hover:bg-gray-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
      >
        {t("HomePage.3")}
      </Link> */}
      <div className="min-w-full bg-[#110F0E] text-white min-h-80 rounded-[40px] px-8 w-full relative" style={{minHeight: 320}}>
        <div className="pt-16 text-base font-semibold mb-6">{t('HomePage.title1')}</div>
        <div className="text-4xl font-semibold mb-7 mr-[400px] min-h-6">{t('HomePage.title2')}</div>
        <div className="text-base pb-8">powered by {t('HomePage.nuwaLabs')}</div>
        <Image
          className="absolute bottom-0 right-0"
          width={428}
          height={320}
          src="/overview-banner.png"
          alt=""
        />
      </div>
      <div className="min-w-full bg-white h-80 rounded-[40px] px-8 w-full relative mt-3 pt-6">
        <div className="text-black text-8 font-semibold mb-3">{t('HomePage.quickstart')}</div>
        <div className="grid grid-cols-3 gap-4">
          <Link
            href="/character"
            className="hover:scale-105 flex p-2 justify-between relative col-span-2 h-40 bg-black rounded-lg bg-no-repeat bg-center bg-[url('/overview-create-character-bg.png')]">
            <div className="w-1 h-full bg-white"></div>
            <Image
              className=""
              width={215}
              height={162}
              src="/overview-create-character-bg2.png"
              alt=""
            />
            <div className="absolute top-8 left-8">
              <div className="font-semibold text-3xl text-white">{t('HomePage.createDigitalLife')}</div>
              <Image
                className="m-2"
                width={33}
                height={10}
                src="/overview-create-character-arraw.png"
                alt=""
              />
            </div>
          </Link>
          <Link
            href="/worldbook"
            className="bg-gray-100 relative rounded-lg flex items-center justify-center hover:scale-105"
          >
            <div className="w-1 h-[9rem] bg-[#212121] absolute left-2 my-2"></div>
            <div className="flex flex-col items-center justify-center my-auto">
              <div className="text-center m-auto text-base">{t('HomePage.createWorldBook')}</div>
              <Image
                  className="m-2 rotate-[21deg]"
                  width={75}
                  height={82}
                  src="/overview-create-worldbook-bg.png"
                  alt=""
                />
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Homepage;
