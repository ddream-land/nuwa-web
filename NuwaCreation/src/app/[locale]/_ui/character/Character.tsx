'use client'
import React from "react";
import {Tabs, Tab, Card, CardBody} from "@nextui-org/react";
import { Link } from '@/navigation';
import { useTranslations, useLocale } from "next-intl";
import { usePathname } from "next/navigation";
import dynamic from 'next/dynamic';
import Preview from "./Preview";

const InforMation = dynamic(() => import('./InforMation'), { ssr: false })
const Scenario = dynamic(() => import('./Scenario'), { ssr: false })
const Mes_Example = dynamic(() => import('./Mes_Example'), { ssr: false })
const Avatar = dynamic(() => import('./Avatar'), { ssr: false })
const Voice = dynamic(() => import('./Voice'), { ssr: false })
const CreatorInfo = dynamic(() => import('./CreatorInfo'), { ssr: false })
const AdvancedSet = dynamic(() => import('./AdvancedSet'), { ssr: false })


export default function Character() {
  const t = useTranslations();
  const locale = useLocale();
  const pathname = usePathname();
  return (
      <div className="relative flex w-full flex-col">
        <div className="fixed mt-2 right-8 z-40">
          <Preview/>
        </div>
        <div className="flex w-full flex-col relative">
          <Tabs
            aria-label="Options"
            selectedKey={pathname}
            variant="solid"
            classNames={{
              base: "pr-62 fixed mt-0 z-30 py-2 overflow-x-scroll w-full pr-[200px] lg:pr-[500px]",
              tabList: "bg-[#D9D9D9] py-2 overflow-x-scroll",
              cursor: "w-full bg-[#0C0C0C] text-white",
              tab:"group-data-[selected=true]:bg-[#0C0C0C] px-2 h-10",
              tabContent: "text-zinc-800 group-data-[selected=true]:text-white w-full h-full",
              panel: " pt-20"
            }}
          >
            <Tab key={`/${locale}/character`} id="information" title={
              <Link className="w-full h-full px-4 block leading-8" href={`/character`}>{t('Character.information')}</Link>
            }>
              <InforMation />
            </Tab>
            <Tab key={`/${locale}/character/scenario`} id="scenario" title={
              <Link className="w-full h-full px-4 block leading-8" href={`/character/scenario`}>{t('Character.scenario')}</Link>
            }>
              <Scenario />
            </Tab>
            <Tab key={`/${locale}/character/mesexample`} id="mesexample" title={
              <Link className="w-full h-full px-4 block leading-8" href={`/character/mesexample`}>{t('Character.mesexample')}</Link>
            }>
              <Mes_Example />
            </Tab>
            <Tab key={`/${locale}/character/avatar`} id="avatar" title={
              <Link className="w-full h-full px-4 block leading-8" href={`/character/avatar`}>{t('Character.avatar')}</Link>
            }>
              <Avatar />
            </Tab>
            <Tab key={`/${locale}/character/voice`} id="voice" title={
              <Link className="w-full h-full px-4 block leading-8" href={`/character/voice`}>{t('Character.voice')}</Link>
            }>
              <Voice />
            </Tab>
            <Tab key={`/${locale}/character/creatorinfo`} id="creatorinfo" title={
              <Link className="w-full h-full px-4 block leading-8" href={`/character/creatorinfo`}>{t('Character.creatorinfo')}</Link>
            }>
              <CreatorInfo />
            </Tab>
            <Tab key={`/${locale}/character/advancedset`} id="advancedset" title={
              <Link className="w-full h-full px-4 block leading-8" href={`/character/advancedset`}>{t('Character.advancedset')}</Link>
            }>
              <AdvancedSet />
            </Tab>
          </Tabs>
        </div>
        
      </div>
  );
}
