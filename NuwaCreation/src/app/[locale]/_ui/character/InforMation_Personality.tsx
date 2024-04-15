"use client";
import React from "react";
import { useChara } from "../../_lib/utils";
import { useTranslations } from "next-intl";
import { Button, Card, CardBody, CardHeader, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, useDisclosure } from "@nextui-org/react";
import {
  XMarkIcon,
  ArrowUpRightIcon,
} from '@heroicons/react/24/outline'
import InforMation_Personality_Modal from "./InforMation_Personality_Modal";

function InforMation_Personality() {
  const t = useTranslations();
  const { chara , setChara } = useChara();
  const [personalityValue, setpersonalityValue] = React.useState(chara.data.personality);
  const {isOpen, onOpen, onOpenChange} = useDisclosure();

 
  const handlePersonalityChange = (e:any) => {
    const newValue = e.target.value;
    setPersonalityNewValue(newValue);
  };
  const setPersonalityNewValue = (newValue:any) => {
    setChara((prevChara) => ({
      ...prevChara,
      data: { ...prevChara.data, personality: newValue },
    }));
    setpersonalityValue(newValue);
  }

  return (
    <div className="h-6/12 py-4 flex flex-col">
      <label
        className="block text-lg font-medium leading-8 mb-1"
      >
        {t('Character.personalitysummary')}
      </label>
      <div className="flex flex-row mt-2 grow">  
        <div className="mr-4 grow">
          <textarea
            placeholder="First Message"
            value={chara.data.personality}
            onChange={handlePersonalityChange}
            className="border-none outline-none w-full h-full resize-none mb-6"
          />
        </div>
        <div>

        </div>
        <InforMation_Personality_Modal setPersonalityNewValue={setPersonalityNewValue} oldPersonalityValue={personalityValue}/>
      </div>
    </div>
  );
}

export default InforMation_Personality;
