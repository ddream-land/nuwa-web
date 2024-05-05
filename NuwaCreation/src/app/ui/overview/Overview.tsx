"use client";
import React, { useState } from "react";
import { Link, useRouter } from "@/navigation";
import Image from "next/image";
import { useTranslations } from "next-intl";
import RoleDesignIcon from "@/app/icons/RoleDesignIcon";
import CFGIcon from "@/app/icons/CFGIcon";
import ModelSelectIcon from "@/app/icons/ModelSelectIcon";
import NuwaWorldBookIcon from "@/app/icons/NuwaWorldBookIcon";
import HotKeyIcon from "@/app/icons/HotKeyIcon";
import { Button } from "@nextui-org/react";
import { createChara, pushCharaList, getCharaList, pushWorldBookList, getWorldBookList, InsertWorldBook } from "@/app/lib/utils";
import AlterMessage from "@/app/ui/components/AlterMessage";

const understandandlearnList = [{
  url: '',
  label: 'understandandlearnListItem1',
  icon: RoleDesignIcon
}, {
  url: '',
  label: 'understandandlearnListItem2',
  icon: CFGIcon
}, {
  url: '',
  label: 'understandandlearnListItem3',
  icon: ModelSelectIcon
}, {
  url: '',
  label: 'understandandlearnListItem4',
  icon: NuwaWorldBookIcon
}, {
  url: '',
  label: 'understandandlearnListItem5',
  icon: HotKeyIcon
}]
function Overview() {
  const router = useRouter();
  const t = useTranslations();
  const [isReadCharLoding, setIsReadCharLoding] = useState(false);
  const [isReadWorldBookLoding, setIsReadWorldBookLoding] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState(t('Previews.importok'))
  const charaList  = getCharaList();
  const worldBookList  = getWorldBookList();

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

        const cover = data.Nuwa_ORG_cover;
        delete data.Nuwa_ORG_cover;

        const newChara = createChara(cover, data);
        try {
          pushCharaList([...charaList, newChara]);
        } catch (e: any) {
          setMessage(t("Error.localstoragefull"));
          setIsReadCharLoding(false)
          setIsOpen(true);
          return
        }
        
        setIsReadCharLoding(false)
        setMessage(t('Previews.importok'))
        setIsOpen(true);

        router.replace('/charas');
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

        const newWorldBook = InsertWorldBook(data);
        try {
          pushWorldBookList([...worldBookList, newWorldBook]);
        } catch (e: any) {
          setMessage(t("Error.localstoragefull"));
          setIsOpen(true);
          return
        }
        
        if(data){
          const newWorldBook = InsertWorldBook({
            entries: data.entries,
            name: file.name.split(".json")[0]
          });
          try {
            pushWorldBookList([...worldBookList, newWorldBook]);
          } catch (e: any) {
            setMessage(t("Error.localstoragefull"));
            setIsOpen(true);
            return
          }
        }
        setIsReadWorldBookLoding(false)
        setMessage(t('Previews.importok'))
        setIsOpen(true);

        router.replace('/worldbook');
      }else{
        setIsReadWorldBookLoding(false)
      }
    }else{
      setIsReadWorldBookLoding(false)
    }
  }
  return (
    <div className="mx-auto max-w-7xl pb-32 flex flex-col">
    <AlterMessage isOpen={isOpen} message={message} onClose={() => {
      setIsOpen(false)
    }} />
      <div className=" overflow-hidden flex flex-col min-w-full bg-[#110F0E] text-white min-h-80 rounded-[40px] w-full relative" style={{minHeight: 320}}>
        <div className="pt-8 text-base mb-6 px-8">{t('Overview.title1')}</div>
        <div className="grow  px-8 xl:mr-[400px] min-h-6 mb-2">

          <div className="text-4xl font-semibold mb-4">{t('Overview.title2')}</div>
          <div className="text-xl">{t('Overview.title3')}</div>
        </div>
        <div className=" px-8 pt-5 h-16 w-full bg-white bg-opacity-40 rounded-bl-[39px] rounded-br-[39px] backdrop-blur-[20px] z-10">Powered by {t('Overview.nuwaLabs')}</div>
        <Image
          className="absolute bottom-0 right-0 hidden xl:block"
          width={428}
          height={320}
          src="/overview-banner.jpg"
          alt=""
        />
      </div>

      <div className="grid lg:grid-cols-5 grid-cols-1 w-full gap-6 mt-6">
        <div className="lg:col-span-3 min-w-full bg-gray-100 pb-7 rounded-[40px] px-8 w-full relative pt-6">
          <div className="text-black text-3xl font-semibold mb-5">{t('Overview.quickstart')}</div>
          <div className="grid grid-row-2 gap-4">
            <div className="grid grid-cols-3 gap-4">
            <Link
              href="/character"
              className="hover:scale-105 relative flex flex-row justify-between col-span-2 h-40 bg-black rounded-lg bg-no-repeat bg-center bg-[url('/overview-create-character-bg.png')]">
              <div className="p-2 flex justify-between h-full">
                <div className="w-1 h-full bg-white"></div>
              </div>
              <Image
                className=""
                width={215}
                height={162}
                src="/overview-create-character-bg2.png"
                alt=""
              />
              <div className="absolute top-8 left-8">
                <div className=" text-base text-white mb-2">{t('Overview.createDigitalLife')}</div>
                <div className="font-semibold text-3xl text-white">{t('Overview.createDigitalLife2')}</div>
                {/* <Image
                  className="m-2"
                  width={33}
                  height={10}
                  src="/overview-create-character-arraw.png"
                  alt=""
                /> */}
              </div>
              
            </Link>
            <Link
              href="/worldbook"
              className="bg-gray-200 relative rounded-lg flex items-center justify-center hover:scale-105"
            >
              {/* <div className="w-1 h-[9rem] bg-[#212121] absolute left-2 my-2"></div> */}
              <div className="flex flex-col items-center justify-between w-full h-full my-auto p-4">
                <div className="w-full">
                  <div className="text-left m-auto text-2xl">{t('Overview.createWorldBook')}</div>
                  <div className="text-left m-auto text-2xl mb-2">{t('Overview.createWorldBook2')}</div>
                </div>
                <div className="w-full flex flex-row-reverse">
                  <Image
                    className="m-2 rotate-[21deg]"
                    width={35}
                    height={40}
                    src="/overview-create-worldbook-bg2.png"
                    alt=""
                  />
                </div>
              </div>
            </Link>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <Button
              isLoading={isReadCharLoding}
              onClick={() => {
                const ReadChar = document.getElementById("ReadChar");
                if (ReadChar) {
                  ReadChar.click();
                }
              }}
              className="col-span-1 bg-gray-200 h-[116px] relative rounded-lg flex items-center justify-center hover:scale-105 break-words"
            >
              <input
                accept=".png"
                type="file"
                id="ReadChar"
                style={{ display: 'none' }}
                onChange={handleReadChar}
              />
              <div className="max-w-full whitespace-normal overflow-hidden">
                <div className="text-black text-xl sm:text-3xl font-semibold tracking-tight">{t('Overview.readDigitalLife')}</div>
                <div className="text-gray-500 text-sm sm:text-sm tracking-tight mt-2">{t('Overview.readDigitalLifetip')}</div>
              </div>
            </Button>
            
            <Button
              isLoading={isReadWorldBookLoding}
              onClick={() => {
                const ReadWorldBook = document.getElementById("ReadWorldBook");
                if (ReadWorldBook) {
                  ReadWorldBook.click();
                }
              }}
              className="col-span-1 bg-gray-200 h-[116px] relative rounded-lg flex items-center justify-center hover:scale-105 text-wrap"
            >
              <input
                accept=".json"
                type="file"
                id="ReadWorldBook"
                style={{ display: 'none' }}
                onChange={handleReadWorldBook}
              />
              <div className="max-w-full whitespace-normal overflow-hidden">
                <div className="text-black text-xl sm:text-3xl font-semibold tracking-tight">{t('Overview.readWorldBook')}</div>
                <div className="text-gray-500 text-sm sm:text-sm tracking-tight mt-2">{t('Overview.readWorldBooktip')}</div>
              </div>
            </Button>
          </div>
          </div>
          
        </div>
        <div className="lg:col-span-2 min-w-full bg-gray-100 pb-7 rounded-[40px] px-5 w-full relative pt-6">
          <div className="text-black text-3xl font-semibold mb-5 px-3 flex flex-row justify-between">
            <div>{t('Overview.understandandlearn')}</div>
            <Button className="h-[32px] bg-neutral-100 rounded-[11px]" >
              <div className="text-center text-zinc-500 text-xs font-normal">{t('Overview.morebtn')}{' >'}</div>
            </Button>
          </div>
          <div className="flex flex-col gap-4">
            {understandandlearnList.map((item,index) => (
              <Link
                href={item.url}
                key={index}
                className="flex flex-row items-center group hover:bg-black h-12 w-full rounded-[9px] px-3"
              >
                <div className="w-10">
                  <item.icon className="w-22 h-22 fill-[#797979] group-hover:fill-white" />
                </div>
                <div className="text-neutral-700 text-sm font-normal leading-relaxed tracking-tight group-hover:text-white">{t('Overview.'+item.label)}</div>
              </Link>
            ))}
            
          </div>
        </div>
      </div>
      
    </div>
  );
}

export default Overview;
