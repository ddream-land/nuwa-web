'use client'
import React from "react";
import { Button, Popover, PopoverTrigger, PopoverContent} from "@nextui-org/react";
import { useTranslations } from "next-intl";
import { useAmDispatch } from "../components/AlterMessageContextProvider";

export default function App() {
  const  t = useTranslations();
  const amDispatch = useAmDispatch();

  const handleDelLocalestorge = () => {
    // Delete all items from localStorage
    localStorage.clear();
    amDispatch({
      type: "add",
      payload: t("Settings.DelDone"),
    })
  };

  return (
    <>
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
