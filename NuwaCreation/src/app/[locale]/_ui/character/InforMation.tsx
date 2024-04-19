"use client";
import React from "react";
import { Divider } from "@nextui-org/react";
import InforMation_FirstMessage from "./InforMation_FirstMessage";
import InforMation_Cover from "./InforMation_Cover";
import InforMation_Name from "./InforMation_Name";
import InforMation_Personality from "./InforMation_Personality";
import InforMation_Description from "./InforMation_Description"
import InforMation_AlternateGreetings from "./InforMation_AlternateGreetings"
import { Link } from "@/navigation";
import Image from "next/image";

function InforMation() {
  
  return (
    <>   
      <div className="grid grid-cols-3 gap-4">
        <InforMation_Cover />
        <div
          className="col-span-2 bg-white rounded-[40px] flex flex-col"
        >
          <InforMation_Name />
  
          <div className="flex flex-col grow mt-6 px-6">
            <InforMation_Personality />
            <Divider className="bg-[#E6E6E6]" />
          
            <InforMation_Description />
          </div>
          

          {
          /*
          <div className="">
            <label
              className="block text-sm font-medium leading-6"
            >
              {t('Character.tagstoembed')}
            </label>
            <div className="mt-2">
              <Input
                value={chara.data.tags}
                onChange={(e) => setChara((prevChara) => ({ ...prevChara, data: { ...prevChara.data, tags: e.target.value } }))}
                autoComplete="off"
                type="text"
                variant="underlined"
              />
            </div>
          </div>
          
          */}
        </div>

      </div>
      <div>

      <div className="relative">
        <div className="w-11/12">
          <InforMation_FirstMessage />
        </div>
        
        <Link href='/character/scenario'>
          <Image className=" absolute -right-1 top-1 cursor-pointer" width={120} height={114} src="/character-nexttab.png" alt="" />
        </Link>
      </div>
      <InforMation_AlternateGreetings />
      </div>
    </>
  );
}

export default InforMation;
