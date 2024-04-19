"use client";
import React, { useRef } from "react";
import { useChara } from "../../_lib/utils";
import { useTranslations, useMessages } from "next-intl";
import CCLicensesRadio from "../components/CCLicensesRadio";
import { Link } from "@/navigation";


function CreatorInfo_CCLicenses() {
  const t = useTranslations();
  const messages = useMessages();
  const { chara , setChara } = useChara();

  const [cclicense, setCclicense] = React.useState(chara.data.extensions.cclicense);
 
  return (
    <div className="bg-white h-full w-full rounded-[40px] relative pb-24">
      <Link href="https://creativecommons.org/share-your-work/cclicenses/" target="_blank" className=" absolute top-4 right-10 text-black text-[10px] font-normal leading-[14.50px] tracking-tight">
        {t('Character.copyrighttip3')}
      </Link>
      <div className="flex flex-col h-full w-full py-7 px-7 rounded-[40px]">
        <label
          className="text-neutral-950 text-2xl font-semibold leading-loose tracking-tight"
        >
          {t('Character.copyright')}
        </label>
        <div className="text-black text-xl leading-9 tracking-tight">
          {t('Character.copyrighttip1')}
        </div>
        <Link href="https://creativecommons.org/share-your-work/cclicenses/" target="_blank" className="text-black text-[8px] font-normal leading-[14.50px] tracking-tight">
          {t('Character.copyrighttip2')}https://creativecommons.org/share-your-work/cclicenses/
        </Link>
        <div className="mt-10">
          <CCLicensesRadio
            value={cclicense}
            onChange={(e: any) => {
              setCclicense(e.target.value)
              setChara((prevChara) => ({
                ...prevChara,
                data: {
                  ...prevChara.data,
                  extensions: {
                    ...prevChara.data.extensions,
                    cclicense: e.target.value
                  }
                }
              })
              )
            }}
          />
        </div> 
      </div>
    </div>
  );
}

export default CreatorInfo_CCLicenses;
