"use client";
import React from "react";
import CreatorInfo_Base from "./CreatorInfo_Base";
import CreatorInfo_Language from "./CreatorInfo_Language";
import CreatorInfo_Level from "./CreatorInfo_Level";
import Image from "next/image";
import { Link } from "@/navigation";
import CreatorInfo_CCLicenses from "./CreatorInfo_CCLicenses";

function CreatorInfo() {
  
  return (
    <>   
      <div className="grid grid-cols-1 grid-rows-2 md:grid-cols-2 gap-4 py-7">
        <div className="row-span-2 min-h-[630px]">
          <CreatorInfo_Base />
        </div>
        <div className="h-full" >
          <CreatorInfo_Language />
        </div>
        <div className="h-full relative" >
          <CreatorInfo_Level />
{/* 
          <Link href='/character/advancedset'>
            <Image className=" absolute -right-2 -bottom-2 cursor-pointer" width={120} height={114} src="/character-nexttab.png" alt="" />
          </Link> */}
        </div>
      </div>
      <div className="h-full relative">
        <CreatorInfo_CCLicenses />

        {/* <Link href='/character/advancedset'>
          <Image className=" absolute -right-2 -bottom-2 cursor-pointer" width={120} height={114} src="/character-nexttab.png" alt="" />
        </Link> */}
      </div>
    </>
  );
}

export default CreatorInfo;
