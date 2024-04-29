"use client";
import { useState } from "react";
import { useTranslations } from "next-intl";
import ClearLocalstorge from "./ClearLocalstorge";
import FeedbackIcon from "../icons/FeedbackIcon";
import NuwaButton from "../components/NuwaButton";
import ClearIcon from "../icons/ClearIcon";
import ContactUsIcon from "../icons/ContactUsIcon";
import { DocumentDuplicateIcon, GlobeAltIcon, TrashIcon } from "@heroicons/react/24/outline";

export default function Settings() {
  const t = useTranslations();
  const [automaticTimezoneEnabled, setAutomaticTimezoneEnabled] =
    useState(true);

  return (
    <div className="px-4 sm:px-36">
      <div className="py-16">
        <div className="text-neutral-800 text-[40px] font-normal leading-[73px] tracking-tight">
          {t("Settings.title")}
        </div>
      </div>
      <div className="grid grid-cols-1 divide-y">
        <div className="flex flex-row justify-between py-5">
          <div className="flex flex-row gap-2 items-center">
            <div className="w-6">
              <DocumentDuplicateIcon className={""} />
            </div>
            <div className="w-[151px] opacity-80 text-neutral-700 text-sm font-normal leading-relaxed tracking-tight">{t('Settings.feedback')}</div>
          </div>
          <div className="text-neutral-700 text-sm font-normal leading-relaxed tracking-tight">
            info@nuwalabs.org
          </div>
        </div>
        <div className="flex flex-col justify-between py-5">
          <div className="flex flex-row gap-2 items-center">
            <div className="w-6">
              <GlobeAltIcon className={""} />
            </div>
            <div className="w-[151px] opacity-80 text-neutral-700 text-sm font-normal leading-relaxed tracking-tight">{t('Settings.contactus')}</div>
          </div>

          <div className="mt-8 mb-0 gap-10 flex flex-row">
            <NuwaButton
              shadowghost="white"
              className="w-[140px]"
            >X（Twitter）</NuwaButton>
            <NuwaButton
              shadowghost="white"
              className="w-[140px]"
            >Discord</NuwaButton>
            <NuwaButton
              shadowghost="white"
              className="w-[140px]"
            >Telegram</NuwaButton>
          </div>
        </div>
        <div className="flex flex-row justify-between py-5">
          <div className="flex flex-row gap-2 items-center">
            <div className="w-6">
              <TrashIcon className={""} />
            </div>
            <div className="w-[151px] opacity-80 text-neutral-700 text-sm font-normal leading-relaxed tracking-tight">{t('Settings.clear')}</div>
          </div>
          <div className="text-neutral-700 text-sm font-normal leading-relaxed tracking-tight">
            <ClearLocalstorge />
          </div>
        </div>
      </div>
      
    </div>
  );
}
