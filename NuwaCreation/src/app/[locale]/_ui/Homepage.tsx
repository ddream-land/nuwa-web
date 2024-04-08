"use client";
import { ChevronRightIcon } from "@heroicons/react/24/outline";
import React from "react";
import { Link } from "@/navigation";
import Image from "next/image";
import { useTranslations } from "next-intl";

function Homepage() {
  const t = useTranslations();
  return (
    <div className="mx-auto max-w-7xl px-6 pb-24 pt-10 sm:pb-32 lg:flex lg:px-8 lg:py-20 flex-col">
      
      {/* <Link
        href="/character"
        className="rounded-md bg-amber-600 dark:bg-gray-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-amber-500 dark:hover:bg-gray-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
      >
        {t("HomePage.3")}
      </Link> */}
      <div className="min-w-full bg-white h-80 rounded-[40px] px-8 w-full relative">
        <div className="mt-16 text-base font-semibold mb-6">基于BRC-1111协议</div>
        <div className="text-4xl font-semibold mb-10">免费、开源的数字生命创造工具</div>
        <div className="text-base">powered by 女娲实验室</div>
        <Image
          className="absolute bottom-0 right-10"
          width={264}
          height={285}
          src="/overview-banner.png"
          alt=""
        />
      </div>
      <div className="min-w-full bg-white h-80 rounded-[40px] px-8 w-full relative mt-3 pt-6">
        <div className="text-black text-8 font-semibold mb-3">快速开始</div>
        <div className="grid grid-cols-3 gap-4">
          <Link
            href="/character"
            className="flex p-2 justify-between relative col-span-2 h-40 bg-black rounded-lg bg-no-repeat bg-center bg-[url('/overview-create-character-bg.png')]">
            <div className="w-1 h-full bg-white"></div>
            <Image
              className=""
              width={215}
              height={162}
              src="/overview-create-character-bg2.png"
              alt=""
            />
            <div className="absolute top-8 left-8">
              <div className="font-semibold text-3xl text-white">创建数字生命</div>
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
            className="bg-gray-100  rounded-lg flex items-center justify-items-center"
          >
              <div className="text-center m-auto">创建世界书</div>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Homepage;
