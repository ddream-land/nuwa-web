"use client";
import React from "react";
import { useChara } from "../../_lib/utils";
import { useTranslations } from "next-intl";

function InforMation_Name() {
  const t = useTranslations();
  const { chara , setChara } = useChara();

  const handleNameChange = (e:any) => {
    const newValue = e.target.value;
    setChara((prevChara) => ({
      ...prevChara,
      data: { ...prevChara.data, name: newValue },
    }));
  };

  return (
    <div className="flex flex-col justify-center bg-[#313131] rounded-[40px] h-[150px] p-7 bg-[url('/create-digitallife-name-bg.png')] bg-no-repeat bg-[center_right_1rem]">
      <label
        className="block text-3xl text-white"
      >
        {t('Character.charactername')}<span className="text-white">*</span>
      </label>
      <div className="mt-2">
        <input
          className="text-3xl text-right text-white bg-transparent border-none outline-none w-full"
          placeholder="请输入"
          value={chara.data.name}
          onChange={handleNameChange}
        />
      </div>
    </div>
  );
}

export default InforMation_Name;
