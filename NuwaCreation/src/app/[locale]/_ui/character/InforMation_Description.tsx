"use client";
import React, { useRef } from "react";
import { useChara } from "../../_lib/utils";
import { useTranslations } from "next-intl";
import { Button } from "@nextui-org/react";
import { ArrowUpRightIcon } from "@heroicons/react/24/outline";
import InsertUserOrChar from "../components/InsertUserOrChar";

function InforMation_Description() {
  const t = useTranslations();
  const { chara , setChara } = useChara();
  const descTextareaRef = useRef(null);


  const handleDescriptionChange = (e:any) => {
    const newValue = e.target.value;
    setChara((prevChara) => ({
      ...prevChara,
      data: { ...prevChara.data, description: newValue },
    }));
  };

  return (
    <div className="group h-6/12 py-4 flex flex-col">
      <label
        className="block text-lg font-medium leading-8 mb-1"
      >
        {t('Character.description')}*
      </label>
      <div className="flex flex-row mt-2 grow">  
        <div className="mr-4 grow">
          <textarea
            ref={descTextareaRef}
            placeholder="Description"
            value={chara.data.description}
            onChange={handleDescriptionChange}
            className="border-none outline-none w-full h-full resize-none mb-6 break-all"
          />
        </div>
        <div className="opacity-0 group-hover:opacity-100">
          <InsertUserOrChar getTextRef={() => {
            return descTextareaRef.current
          }} onDone={(newValue) => {
            setChara((prevChara) => ({
              ...prevChara,
              data: { ...prevChara.data, description: newValue },
            }));
          }} />
        </div>
        
      </div>     
    </div>
  );
}

export default InforMation_Description;
