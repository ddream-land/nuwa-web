"use client"

import React from "react";
import { useTranslations } from "next-intl";
import { TrashIcon } from "@heroicons/react/24/outline";
import { Button, Popover, PopoverContent, PopoverTrigger } from "@nextui-org/react";
import { PencilSquareIcon } from "@heroicons/react/24/outline";
import { TypeWorldBook, TypeWorldBookItem } from "@/app/lib/definitions";
import WorldBookItem from "./WorldBookItem"

export default function WorldBookOperateWrapper({worldBookItem, onEdit, onDelete}: {
  worldBookItem: TypeWorldBook;
  onEdit?: () => void;
  onDelete?: () => void;
}) {
  const t = useTranslations();
  const [isOpen, setIsOpen] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);

  return (
    <>
      <div className="relative group w-full h-full">
        <WorldBookItem worldBookItem={worldBookItem} />

        {(onEdit || onDelete) && (
          <div className="absolute top-4 right-4 flex flex-col gap-4">
            {onDelete && (
              <Popover
                placement="top"
                color='danger'
                isOpen={isOpen}
                shouldCloseOnBlur={true}
                isKeyboardDismissDisabled={true}
                onOpenChange={(open) => setIsOpen(open)}
              >
                <PopoverTrigger>
                  <Button
                    className="bg-black text-white opacity-0 group-hover:opacity-100"
                    startContent={<TrashIcon className="h-5 w-5"/>}
                    isIconOnly
                    isLoading={isLoading}
                    isDisabled={isLoading}
                    onClick={() => {
                      setIsOpen(true);
                    }}
                  ></Button>
                </PopoverTrigger>
                <PopoverContent>
                  <Button 
                    className="w-full font-semibold" 
                    size="sm" 
                    color="danger"
                    isLoading={isLoading}
                    isDisabled={isLoading}
                    onClick={async () => {
                      setIsOpen(false);
                      setIsLoading(true);
                      await onDelete();
                      setIsLoading(false);
                    }}
                  >    
                    {t('Previews.mymindismadeup')}
                  </Button>
                </PopoverContent>
              </Popover>
            )}
            {onEdit && (
              <Button
                className="bg-black text-white opacity-0 group-hover:opacity-100"
                startContent={<PencilSquareIcon className="h-5 w-5"/>}
                isIconOnly
                onClick={() => {
                  onEdit();
                }}
              ></Button>
            )}
          </div>
        )}
        
      </div>
    </>
  );
}
