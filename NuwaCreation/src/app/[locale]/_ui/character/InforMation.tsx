"use client";
import React from "react";
import { Divider } from "@nextui-org/react";
import InforMation_FirstMessage from "./InforMation_FirstMessage";
import InforMation_Cover from "./InforMation_Cover";
import InforMation_Name from "./InforMation_Name";
import InforMation_Personality from "./InforMation_Personality";
import InforMation_Description from "./InforMation_Description"
import InforMation_AlternateGreetings from "./InforMation_AlternateGreetings"

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
          

          {/* <div className="">
            <label
              className="block text-sm font-medium leading-6"
            >
              {t('Character.createdby')}
            </label>
            <div className="mt-2">
              <Input
                value={chara.data.creator}
                onChange={(e) => setChara((prevChara) => ({ ...prevChara, data: { ...prevChara.data, creator: e.target.value } }))}
                maxLength={64}
                autoComplete="off"
                type="text"
                variant="underlined"
              />
            </div>
          </div>

          <div className="">
            <label
              className="block text-sm font-medium leading-6"
            >
              {t('Character.characterversion')}
            </label>
            <div className="mt-2">
              <Input
                value={chara.data.character_version}
                onChange={(e) => setChara((prevChara) => ({ ...prevChara, data: { ...prevChara.data, character_version: e.target.value } }))}
                maxLength={64}
                autoComplete="off"
                type="text"
                variant="underlined"
              />
            </div>
          </div>

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

          <div className="">
            <label
              className="block text-sm font-medium leading-6"
            >
              {t('Character.creatorsnotes')}
            </label>
            <div className="mt-2">
              <Input
                value={chara.data.creator_notes}
                onChange={(e) => setChara((prevChara) => ({ ...prevChara, data: { ...prevChara.data, creator_notes: e.target.value } }))}
                autoComplete="off"
                type="text"
                variant="underlined"
              />
            </div>
          </div>

          <div className="">
            <label
              className="block text-sm font-medium leading-6"
            >
              {t('Character.talkativeness')}
            </label>
            <div className="mt-2">
              <Input
                value={chara.data.extensions.talkativeness}
                onChange={(e) => setChara((prevChara) => ({...prevChara,data: {...prevChara.data,extensions: {...prevChara.data.extensions,talkativeness: e.target.value}}}))}
                step={0.1}
                max={1}
                min={0}
                autoComplete="off"
                type="number"
                variant="underlined"
              />
            </div>
          </div>

          <div className="">
            <label
              className="block text-sm font-medium leading-6"
            >
              {t('Character.scenario')}
            </label>
            <div className="mt-2">
              <Input
                value={chara.data.scenario}
                onChange={(e) => setChara((prevChara) => ({ ...prevChara, data: { ...prevChara.data, scenario: e.target.value } }))}
                autoComplete="off"
                type="text"
                variant="underlined"
              />
            </div>
          </div> */}
        </div>

      </div>
      <div>
        <InforMation_FirstMessage />
        <InforMation_AlternateGreetings />
      </div>
    </>
  );
}

export default InforMation;
