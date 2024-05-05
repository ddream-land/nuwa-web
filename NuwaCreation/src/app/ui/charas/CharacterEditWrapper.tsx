'use client'
import React from "react";
import {Tabs, Tab } from "@nextui-org/react";
import { useTranslations, useLocale } from "next-intl";
import dynamic from 'next/dynamic';

const InforMation = dynamic(() => import('../character/InforMation'), { ssr: false })
const Plot = dynamic(() => import('../character/Plot'), { ssr: false })
const Mes_Example = dynamic(() => import('../character/Mes_Example'), { ssr: false })
const Avatar = dynamic(() => import('../character/Avatar'), { ssr: false })
const Voice = dynamic(() => import('../character/Voice'), { ssr: false })
const CreatorInfo = dynamic(() => import('../character/CreatorInfo'), { ssr: false })
const AdvancedSet = dynamic(() => import('../character/AdvancedSet'), { ssr: false })


export default function CharacterEditWrapper() {
  const t = useTranslations();
  const locale = useLocale();
  return (
    <div className="relative flex w-full flex-col">
      <div className="flex w-full flex-col relative">
        <Tabs
          aria-label="Options"
          variant="underlined"
          size="lg"
          classNames={{
            base: "fixed mt-0 ml-0 left-0 z-50 overflow-x-scroll scrollbar-hide w-full bg-white",
            tabList: "overflow-x-scroll scrollbar-hide gap-10 py-0 border-b border-solid border-black/20 w-full px-20",
            cursor: "w-full bg-[#0C0C0C] text-white",
            tab:"h-10 group-data-[selected=true]:bg-[#0C0C0C]",
            tabContent: " text-neutral-700 w-full h-full group-data-[selected=true]:text-neutral-800 group-data-[selected=true]:font-bold",
            panel: " pt-20"
          }}
        >
          <Tab key={`/${locale}/character`} id="basics" title={t('Character.basics')}>
            <InforMation />
          </Tab>
          <Tab key={`/${locale}/character/plot`} id="plot" title={t('Character.plot')}>
            <Plot />
          </Tab>
          <Tab key={`/${locale}/character/mesexample`} id="mesexample" title={t('Character.mesexample')}>
            <Mes_Example />
          </Tab>
          <Tab key={`/${locale}/character/avatar`} id="avatar" title={t('Character.avatar')}>
            <Avatar />
          </Tab>
          <Tab key={`/${locale}/character/voice`} id="voice" title={t('Character.voice')}>
            <Voice />
          </Tab>
          <Tab key={`/${locale}/character/creatorinfo`} id="creatorinfo" title={t('Character.creatorinfo')}>
            <CreatorInfo />
          </Tab>
          <Tab key={`/${locale}/character/advancedset`} id="advancedset" title={t('Character.advancedset')}>
            <AdvancedSet />
          </Tab>
        </Tabs>
      </div>
    </div>
  );
}
