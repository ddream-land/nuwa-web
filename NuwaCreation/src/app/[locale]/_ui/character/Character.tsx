'use client'
import React from "react";
import {Tabs, Tab, Card, CardBody, Button, Link} from "@nextui-org/react";
import InforMation from "./InforMation";
import Description from "./Description";
import First_Message from "./First_Message";
import Prompt_Overrides from "./Prompt_Overrides";
import { useTranslations } from "next-intl";
import Mes_Example from "./Mes_Example";
import Depth_Prompt from "./Depth_Prompt";
import {
  PaperAirplaneIcon
} from '@heroicons/react/24/outline'

export default function Character() {
  const t = useTranslations();
  return (
      <div className="relative flex w-full flex-col">
        <Button href="/previews" as={Link} className="absolute right-0 top-0 bg-black text-white" startContent={<PaperAirplaneIcon className="h-4 w-4"/>}>{t('Navigation.previews')}</Button>
        <div className="flex w-full flex-col">
          <Tabs
            aria-label="Options"
            variant="solid"
            classNames={{
              base: "mr-32",
              tabList: "bg-[#D9D9D9]",
              cursor: "w-full bg-[#0C0C0C] text-white",
              tab:"group-data-[selected=true]:bg-[#0C0C0C]",
              tabContent: "text-zinc-800 group-data-[selected=true]:text-white",
            }}
          >
            <Tab key="inforMation" title={t('Character.information')}>
              <InforMation/>
            </Tab>
            <Tab key="description" title={t('Character.description')}>
              <Card>
                <CardBody>
                  <Description/>
                </CardBody>
              </Card>  
            </Tab>
            <Tab key="first_mes" title={t('Character.firstmessage')}>
              <Card>
                <CardBody>
                  <First_Message/>
                </CardBody>
              </Card>  
            </Tab>
            <Tab key="prompt_overrides" title={t('Character.promptoverrdies')}>
              <Card>
                <CardBody>
                  <Prompt_Overrides/>
                </CardBody>
              </Card>  
            </Tab>
            <Tab key="mes_example" title={t('Character.mesexample')}>
              <Card>
                <CardBody>
                  <Mes_Example/>
                </CardBody>
              </Card>  
            </Tab>
            <Tab key="depth_prompt" title={t('Character.depthprompt')}>
              <Card>
                <CardBody>
                  <Depth_Prompt/>
                </CardBody>
              </Card>  
            </Tab>
          </Tabs>
        </div>
        
      </div>
  );
}
