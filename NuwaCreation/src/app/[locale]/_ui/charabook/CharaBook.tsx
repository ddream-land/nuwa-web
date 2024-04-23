'use client'
import React from "react";
import {Tabs, Tab, Card, CardBody} from "@nextui-org/react";
import { Link } from '@/navigation';
import { useTranslations, useLocale } from "next-intl";
import { usePathname } from "next/navigation";
import dynamic from 'next/dynamic';

// const InforMation = dynamic(() => import('./InforMation'), { ssr: false })
// const Scenario = dynamic(() => import('./Scenario'), { ssr: false })
// const Mes_Example = dynamic(() => import('./Mes_Example'), { ssr: false })
// const Avatar = dynamic(() => import('./Avatar'), { ssr: false })
// const Voice = dynamic(() => import('./Voice'), { ssr: false })
const CharacterList = dynamic(() => import('./CharacterList'), { ssr: false })
const WorldBookList = dynamic(() => import('./WorldBookList'), { ssr: false })


export default function CharaBook() {
  const t = useTranslations();
  const locale = useLocale();
  const pathname = usePathname();
  return (
      <div className="relative flex w-full flex-col">
        <div className="flex w-full flex-col">
          <Tabs
            aria-label="Options"
            selectedKey={pathname}
            variant="solid"
            classNames={{
              base: "mr-32",
              tabList: "bg-[#D9D9D9]",
              cursor: "w-full bg-[#0C0C0C] text-white",
              tab:"group-data-[selected=true]:bg-[#0C0C0C] p-0",
              tabContent: "text-zinc-800 group-data-[selected=true]:text-white w-full h-full",
            }}
          >
            <Tab key={`/${locale}/charabook`} id="character" title={
              <Link className="w-full h-full px-4 block leading-8" href={`/charabook`}>{t('CharaBook.character')}</Link>
            }>
              <CharacterList />
            </Tab>
            <Tab key={`/${locale}/charabook/worldbook`} id="worldbook" title={
              <Link className="w-full h-full px-4 block leading-8" href={`/charabook/worldbook`}>{t('CharaBook.worldbook')}</Link>
            }>
              <WorldBookList />
            </Tab>
          </Tabs>
        </div>
        
      </div>
  );
}
