'use client'
import React, { useState } from "react";
import { Button, Popover, PopoverTrigger, PopoverContent} from "@nextui-org/react";
import { useTranslations } from "next-intl";
import AlterMessage from "../components/AlterMessage";

export default function App() {
  const  t = useTranslations();
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState(t('Settings.DelDone'))

  const handleDelLocalestorge = () => {
    // Delete all items from localStorage
    localStorage.clear();
    setMessage(t('Settings.DelDone'));
    setIsOpen(true);
  };

  return (
    <>
      <AlterMessage isOpen={isOpen} message={message} onClose={() => {
        setIsOpen(false)
      }} />
      <Popover placement="top" color='danger'>
        <PopoverTrigger>
          <Button color="primary" variant="solid">{t('Settings.clearbtn')}</Button>
        </PopoverTrigger>
        <PopoverContent>
          <Button 
            className="w-full font-semibold" 
            size="sm" 
            color="danger"
            onClick={(e) => {
              handleDelLocalestorge();
            }}
          >    
            {t('Previews.mymindismadeup')}
          </Button>
        </PopoverContent>
      </Popover>
    </>
  );
}
