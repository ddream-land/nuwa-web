"use client";
import React from "react";
import { useChara } from "../../_lib/utils";
import { useTranslations } from "next-intl";

function InfoMation_FirstMessage() {
  const t = useTranslations();
  const { chara , setChara } = useChara();
  const [first_messageValue, setFirst_MessageValue] = React.useState(chara.data.first_mes);

  const handleFirst_MessageChange = (e:any) => {
    const newValue = e.target.value;
    setChara((prevChara) => ({
      ...prevChara,
      data: { ...prevChara.data, first_mes: newValue },
    }));
    setFirst_MessageValue(newValue);
  };

  return (
      <div>
        <div className="flex flex-col grow mt-6">
          <div className="py-4 flex flex-col bg-white h-32 rounded-[40px] p-7">
            <label
              className="block text-lg font-medium leading-8 mb-1"
            >
              {t('Character.firstmessage')}*
            </label>
            <div className="flex flex-row mt-2 grow shrink">  
              <div className="mr-4 w-5/6">
                <textarea
                  placeholder={t('Character.firstmessage')}
                  value={chara.data.first_mes}
                  onChange={handleFirst_MessageChange}
                  className="border-none outline-none w-full resize-none mb-6"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
  );
}

export default InfoMation_FirstMessage;
