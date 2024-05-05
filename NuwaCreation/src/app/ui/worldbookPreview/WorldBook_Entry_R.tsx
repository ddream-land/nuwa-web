"use client";
import React from "react";
import { useTranslations } from "next-intl";
import NuwaTextareaWrapper from "../components/NuwaTextareaWrapper";
import NuwaRadioWrapper from "../components/NuwaRadioWrapper";
import NuwaFormWrapper from "../components/NuwaFormWrapper";
import { TypeWorldBookEntriy } from "@/app/lib/definitions";

export default function WorldBook_Entry_R({value, isPreview = false, onChange}: {
  value?: TypeWorldBookEntriy,
  isPreview?: boolean,
  onChange: (value: TypeWorldBookEntriy) => void,
}) {
  const t = useTranslations();


  return (
    <div className="h-[620px] flex flex-col divide-y">
      <div className="grow">
        <NuwaTextareaWrapper
          label={t('WorldBook.optionalfilter')}
          textareaProps={{
            disabled: isPreview,
            value: value?.secondary_keys,
            onChange: (e: { target: { value: any; }; }) => (
              onChange({ ...value, secondary_keys: e.target.value } as TypeWorldBookEntriy)
            )
          }}
        >
        </NuwaTextareaWrapper>
      </div>
      <div className="grow">
        <NuwaFormWrapper
          label={<div className="flex flex-row justify-between">
            <div>{t('WorldBook.orfer')}</div><div>{t('WorldBook.depth')}</div>
          </div>}
        >
          <div className="flex flex-row justify-between">
            <input
              disabled={isPreview}
              className="grow border-none outline-none disabled:bg-transparent"
              color="primary"
              autoComplete="off"
              value={value?.insertion_order as number}
              onChange={(e: { target: { value: any; }; }) => (
                onChange({ ...value, insertion_order: e.target.value } as TypeWorldBookEntriy)
              )}
              type="number"
              max={1000}
              min={0}
              step={1}
            />
            <input
              disabled={isPreview}
              className="grow border-none outline-none text-right disabled:bg-transparent"
              autoComplete="off"
              value={value?.depth as number}
              onChange={(e: { target: { value: any; }; }) => (
                onChange({ ...value, depth: e.target.value } as TypeWorldBookEntriy)
              )}
              type="number"
              max={4}
              min={0}
              step={1}
            />
          </div>
        </NuwaFormWrapper>
      </div>
      <div className="grow">
        <NuwaRadioWrapper
          label={t('WorldBook.position')}
          radioList={[
            {
              value: 0,
              name: t('WorldBook.beforechar'),
            },
            {
              value: 1,
              name: t('WorldBook.afterchar'),
            },
            {
              value: 2,
              name: t('WorldBook.berforean'),
            },
            {
              value: 3,
              name: t('WorldBook.afteran'),
            },
            {
              value: 4,
              name: t('WorldBook.D'),
            },
          ]}
          radioProps={{
            isDisabled: isPreview,
            value: value?.position,

            onChange: (e: { target: { value: any; }; }) => {
              
              onChange({ ...value, position: Number(e.target.value) } as TypeWorldBookEntriy)
            }
          }}
        >
        </NuwaRadioWrapper>
      </div>
      <div className="grow">
        <NuwaRadioWrapper
          label={t('WorldBook.status')}
          radioList={[
            {
              value: true,
              name: t('WorldBook.constan'),
            }, 
            {
              value: false,
              name: t('WorldBook.normal'),
            }
          ]}
          radioProps={{
            isDisabled: isPreview,
            value: value?.constant,
            onChange: (e: { target: { value: any; }; }) => (
              onChange({ ...value, constant: Boolean(e.target.value === 'true') }as TypeWorldBookEntriy)
            )
          }}
        >
        </NuwaRadioWrapper>
      </div>
    </div>
  );
}
