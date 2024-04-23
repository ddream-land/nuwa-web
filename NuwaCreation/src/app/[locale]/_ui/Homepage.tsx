"use client";
import { ChevronRightIcon } from "@heroicons/react/24/outline";
import React, { useState } from "react";
import { Link } from "@/navigation";
import Image from "next/image";
import { useTranslations } from "next-intl";
import RoleDesignIcon from "./icons/RoleDesignIcon";
import CFGIcon from "./icons/CFGIcon";
import ModelSelectIcon from "./icons/ModelSelectIcon";
import NuwaWorldBookIcon from "./icons/NuwaWorldBookIcon";
import HotKeyIcon from "./icons/HotKeyIcon";
import { Button } from "@nextui-org/react";
import { useChara, useCharacterBook, useCover } from "../_lib/utils";
import AlterMessage from "./components/AlterMessage";

const understandandlearnList = [{
  url: '',
  label: '角色设计',
  icon: RoleDesignIcon
}, {
  url: '',
  label: 'CFG',
  icon: CFGIcon
}, {
  url: '',
  label: '模型选择',
  icon: ModelSelectIcon
}, {
  url: '',
  label: '世界书',
  icon: NuwaWorldBookIcon
}, {
  url: '',
  label: '热键',
  icon: HotKeyIcon
}]
function Homepage() {
  const t = useTranslations();
  const [isReadCharLoding, setIsReadCharLoding] = useState(false);
  const [isReadWorldBookLoding, setIsReadWorldBookLoding] = useState(false);
  const {chara,setChara} = useChara();
  const {character_book,setCharacter_Book} =  useCharacterBook()
  const {cover,setCover} = useCover();
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState(t('Previews.importok'))

  const handleReadChar = async(e:any) =>{
    if(typeof window !== "undefined"){
      setIsReadCharLoding(true);
      const file = e.target.files[0];
      const res = await fetch("/api/readchar",{
        method:"POST",
        body:file,          
      });
      if(res.ok){
        const data = await res.json();
        // if(data.data.character_book){
        //   setCharacter_Book(data.data.character_book)
        // }
        setCover(data.Nuwa_ORG_cover)
        // delete data.data.character_book;
        delete data.Nuwa_ORG_cover;
        data.data.extensions.world = '';
        setChara(data)
        setIsReadCharLoding(false)
        setMessage(t('Previews.importok'))
        setIsOpen(true);
      }else{
        setIsReadCharLoding(false)
      }
    }else{
      setIsReadCharLoding(false)
    }
  }

  const handleReadWorldBook = async(e:any) =>{
    if(typeof window !== "undefined"){
      setIsReadWorldBookLoding(true);
      const file = e.target.files[0];
      const res = await fetch("/api/readworldbook",{
        method:"POST",
        body:file,          
      });
      if(res.ok){
        const data = await res.json();
        if(data){
          setCharacter_Book({
            entries: data.entries,
            name: file.name.split(".json")[0]
          })
        }
        setIsReadWorldBookLoding(false)
        setMessage(t('Previews.importok'))
        setIsOpen(true);
      }else{
        setIsReadWorldBookLoding(false)
      }
    }else{
      setIsReadWorldBookLoding(false)
    }
  }
  return (
    <div className="mx-auto max-w-7xl pb-32 flex px-8 flex-col">
    <AlterMessage isOpen={isOpen} message={message} onClose={() => {
      setIsOpen(false)
    }} />
      
      {/* <Link
        href="/character"
        className="rounded-md bg-amber-600 dark:bg-gray-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-amber-500 dark:hover:bg-gray-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
      >
        {t("HomePage.3")}
      </Link> */}
      <div className=" overflow-hidden flex flex-col min-w-full bg-[#110F0E] text-white min-h-80 rounded-[40px] w-full relative" style={{minHeight: 320}}>
        <div className="pt-16 text-base font-semibold mb-6 px-8">{t('HomePage.title1')}</div>
        <div className="grow text-4xl px-8 font-semibold mb-7 xl:mr-[400px] min-h-6">{t('HomePage.title2')}</div>
        <div className=" px-8 pt-5 h-[105px] w-full bg-white bg-opacity-40 rounded-bl-[39px] rounded-br-[39px] backdrop-blur-[20px] z-10">powered by {t('HomePage.nuwaLabs')}</div>
        <Image
          className="absolute bottom-0 right-0 hidden xl:block"
          width={428}
          height={320}
          src="/overview-banner.jpg"
          alt=""
        />
      </div>

      <div className="grid lg:grid-cols-5 grid-cols-1 w-full gap-4">
        <div className="lg:col-span-3 min-w-full bg-white pb-7 rounded-[40px] px-8 w-full relative mt-3 pt-6">
          <div className="text-black text-8 font-semibold mb-3">{t('HomePage.quickstart')}</div>
          <div className="grid grid-row-2 gap-4">
            <div className="grid grid-cols-4 gap-4">
            <Link
              href="/character"
              className="hover:scale-105 flex p-2 justify-between relative col-span-3 h-40 bg-black rounded-lg bg-no-repeat bg-center bg-[url('/overview-create-character-bg.png')]">
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
              {/* <div className="w-1 h-[9rem] bg-[#212121] absolute left-2 my-2"></div> */}
              <div className="flex flex-col items-center justify-center my-auto">
                <div className="text-center m-auto text-base">{t('HomePage.createWorldBook')}</div>
                <Image
                    className="m-2 rotate-[21deg]"
                    width={75}
                    height={82}
                    src="/overview-create-worldbook-bg2.png"
                    alt=""
                  />
              </div>
            </Link>
          </div>
          <div className="grid grid-cols-5 gap-4">
            <Button
              isLoading={isReadCharLoding}
              onClick={() => {
                const ReadChar = document.getElementById("ReadChar");
                if (ReadChar) {
                  ReadChar.click();
                }
              }}
              className="col-span-3 bg-gray-200 h-[116px] relative rounded-lg flex items-center justify-center hover:scale-105 break-words"
            >
              <input
                accept=".png"
                type="file"
                id="ReadChar"
                style={{ display: 'none' }}
                onChange={handleReadChar}
              />
              <div className="text-black text-xl sm:text-3xl font-semibold leading-[54.36px] tracking-tight max-w-full whitespace-normal overflow-hidden">{t('HomePage.readDigitalLife')}</div>
            </Button>
            
            <Button
              isLoading={isReadWorldBookLoding}
              onClick={() => {
                const ReadWorldBook = document.getElementById("ReadWorldBook");
                if (ReadWorldBook) {
                  ReadWorldBook.click();
                }
              }}
              className="col-span-2 bg-gray-200 h-[116px] relative rounded-lg flex items-center justify-center hover:scale-105 text-wrap"
            >
              <input
                accept=".json"
                type="file"
                id="ReadWorldBook"
                style={{ display: 'none' }}
                onChange={handleReadWorldBook}
              />
              <div className="text-black text-xl sm:text-3xl font-semibold leading-[54.36px] tracking-tight max-w-full whitespace-normal overflow-hidden">{t('HomePage.readWorldBook')}</div>
            </Button>
          </div>
          </div>
          
        </div>
        <div className="lg:col-span-2 min-w-full bg-white pb-7 rounded-[40px] px-5 w-full relative mt-3 pt-6">
          <div className="text-black text-8 font-semibold mb-3 px-3 flex flex-row justify-between">
            <div>{t('HomePage.understandandlearn')}</div>
            <Button className="w-[32px] h-[32px] bg-neutral-100 rounded-[11px]" >
              <div className="text-center text-zinc-500 text-xs font-normal">{'更多 >'}</div>
            </Button>
          </div>
          <div className="flex flex-col gap-4">
            {understandandlearnList.map((item,index) => (
              <Link
                href={item.url}
                key={index}
                className="flex flex-row items-center group hover:bg-black h-12 w-full rounded-[9px] px-3"
              >
                <item.icon className="w-22 h-22 fill-[#797979] mr-7 group-hover:fill-white" />
                <div className="text-neutral-700 text-sm font-normal leading-relaxed tracking-tight group-hover:text-white">{item.label}</div>
              </Link>
            ))}
            
          </div>
        </div>
      </div>
      
    </div>
  );
}

export default Homepage;
