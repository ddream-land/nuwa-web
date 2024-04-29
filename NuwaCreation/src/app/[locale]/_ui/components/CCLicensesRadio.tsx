import React from "react";
import {RadioGroup, Radio, useRadio, VisuallyHidden, RadioProps, cn} from "@nextui-org/react";
import Image from "next/image";
import { useLocale } from "next-intl";
import { HeartIcon } from "@heroicons/react/24/solid";

const CCLicensesDataListZhcn = [
  {
    value: "CC0",
    label: "CC 0",
    icons: [],
    description: "在法律允许的范围内，放弃其在全球范围内对该作品享有的所有权利，从而将该作品奉献给公共领域。 其他人可以复制、修改、分发和使用该作品，并可用于商业目的，而无需征求许可。",
  },
  {
    value: "CCBY",
    label: "CC BY",
    icons: ['BY'],
    description: "允许他人以任何目、任何媒介，甚至商业目的的使用作品，只要提供适当的署名给原作",
  },
  {
    value: "CCBYNC",
    label: "CC BY-NC",
    icons: ['BY', 'NC'],
    description: "允许他人以任何目的使用作品，但不允许用于商业目的",
  },
  {
    value: "CCBYND",
    label: "CC BY-ND",
    icons: ['BY', 'ND'],
    description: "允许他人下载作品并与他人共享，但不允许对作品进行修改，或以其为基础的进行新的创作",
  },
  {
    value: "CCBYSA",
    label: "CC BY-SA",
    icons: ['BY', 'SA'],
    description: "允许他人以任何目的使用、修改、演绎作品，但新的作品必须使用相同的许可协议",
  },
  {
    value: "CCBYNCND",
    label: "CC BY-NC-ND",
    icons: ['BY', 'NC', 'ND'],
    description: "允许他人以任何目的使用和分发作品，但新的作品必须使用相同的许可协议。不允许商业性使用，必须提供适当的署名给作者，禁止对作品进行修改。",
  },
  {
    value: "CCBYNCSA",
    label: "CC BY-NC-SA",
    icons: ['BY', 'NC', 'SA'],
    description: "允许他人以任何目的使用、修改、演绎作品，但新的作品必须使用相同的许可协议。不允许商业性使用，必须提供适当的署名给作者。",
  }
]

const CCLicensesDataListIconZhcn = {
  'BY': "BY: credit must be given to the creator.",
  'NC': "NC: Only noncommercial uses of the work are permitted.",
  'SA': "SA: Adaptations must be shared under the same terms.",
  'ND': "ND: No derivatives or adaptations of the work are permitted.",
} as any;

const CCLicensesDataListEN = [
  {
    value: "CC0",
    label: "CC 0",
    icons: [],
    description: "CC0 (aka CC Zero) is a public dedication tool, which enables creators to give up their copyright and put their works into the worldwide public domain. CC0 enables reusers to distribute, remix, adapt, and build upon the material in any medium or format, with no conditions.",
  },
  {
    value: "CCBY",
    label: "CC BY",
    icons: ['BY'],
    description: "This license enables reusers to distribute, remix, adapt, and build upon the material in any medium or format, so long as attribution is given to the creator. The license allows for commercial use.",
  },
  {
    value: "CCBYNC",
    label: "CC BY-NC",
    icons: ['BY', 'NC'],
    description: "This license enables reusers to distribute, remix, adapt, and build upon the material in any medium or format for noncommercial purposes only, and only so long as attribution is given to the creator.",
  },
  {
    value: "CCBYND",
    label: "CC BY-ND",
    icons: ['BY', 'ND'],
    description: "This license enables reusers to copy and distribute the material in any medium or format in unadapted form only, and only so long as attribution is given to the creator. The license allows for commercial use.",
  },
  {
    value: "CCBYSA",
    label: "CC BY-SA",
    icons: ['BY', 'SA'],
    description: "This license enables reusers to distribute, remix, adapt, and build upon the material in any medium or format, so long as attribution is given to the creator. The license allows for commercial use. If you remix, adapt, or build upon the material, you must license the modified material under identical terms.",
  },
  {
    value: "CCBYNCND",
    label: "CC BY-NC-ND",
    icons: ['BY', 'NC', 'ND'],
    description: "This license enables reusers to copy and distribute the material in any medium or format in unadapted form only, for noncommercial purposes only, and only so long as attribution is given to the creator.",
  },
  {
    value: "CCBYNCSA",
    label: "CC BY-NC-SA",
    icons: ['BY', 'NC', 'SA'],
    description: "This license enables reusers to distribute, remix, adapt, and build upon the material in any medium or format for noncommercial purposes only, and only so long as attribution is given to the creator. If you remix, adapt, or build upon the material, you must license the modified material under identical terms."
  }
]
const CCLicensesDataListIconEn = {
  'BY': "BY: credit must be given to the creator.",
  'NC': "NC: Only noncommercial uses of the work are permitted.",
  'SA': "SA: Adaptations must be shared under the same terms.",
  'ND': "ND: No derivatives or adaptations of the work are permitted.",
} as any;

const CustomRadio = (props: any) => {
  const locale = useLocale();
  const {
    Component,
    children,
    isSelected,
    description,
    getBaseProps,
    getWrapperProps,
    getInputProps,
    getLabelProps,
    getLabelWrapperProps,
    getControlProps,
  } = useRadio(props);

  return (
    <Component
      {...getBaseProps()}
      className={cn(
        "group w-[330px] h-[230px] rounded-[14px] border border-black border-opacity-20",
        "cursor-pointer py-5 px-5 relative overflow-hidden",
        "data-[selected=true]:border-black data-[selected=true]:border-2 hover:border-black",
        // " hover:bg-content2"
      )}
      onClick={(e: any) => {
        if (e.currentTarget.getAttribute('data-selected') === "true") {
          // 阻止事件冒泡
          e.stopPropagation();
     
          // 阻止事件的默认行为
          e.preventDefault();
          props.onChange();
        }
      }}
    >
      <VisuallyHidden>
        <input {...getInputProps()} />
      </VisuallyHidden>
      {/* <span {...getWrapperProps()} className={cn(
          "w-4 h-4 rounded-[25px] opacity-100 shrink-0",
          isSelected ? "bg-black" : "bg-zinc-300",
        )}
      >
        <span {...getControlProps()} className={cn(
          "bg-black w-[41px] h-[41px] rounded-[25px] opacity-0",
          isSelected ? "opacity-100" : "opacity-0",
        )} />
      </span> */}

      <div className="flex flex-col w-full h-full">

        <div className=" flex flex-row justify-between items-center">
          <span className="text-black text-xl font-bold underline leading-[29px]">{children}</span>

          <Image
            className="w-10 h-4"
            width={40}
            height={6}
            src={`/CCLicenses-${props.value}.png`}
            alt=""
          />
        </div>
        <div className="w-full h-full grow justify-center gap-2 flex flex-col mt-4">
          {props.icons.map((icon: any) => (
            <div className="flex flex-row justify-start items-center gap-2">
              <Image
                className="w-[18px] h-[18px]"
                width={18}
                height={18}
                src={`/CCLicenses-Icon-${icon}.png`}
                alt=""
              />
              <div className="text-neutral-700 text-sm font-normal tracking-tight">
                {(locale === "zh-CN" ? CCLicensesDataListIconZhcn : CCLicensesDataListIconEn)[icon]}
              </div>
            </div>
          ))}
          {props.icons.length === 0 && (
            <div className="w-full h-full flex items-center justify-center">
              <HeartIcon className="h-20 w-20 fill-red-400" />
            </div>
          )}
        </div>
      </div>
      
      <div>
        <span className="h-[170px] px-3 pb-2 text-neutral-700 text-sm font-extralight leading-6 tracking-tight hidden group-hover:block absolute bg-white z-10 left-0 bottom-0 w-full ">{description}</span>
      </div>
    </Component>
  );
};
export default function NuwaRadio({value, onChange}: {
  value: string,
  onChange: (e: any) => void
}) {
  const locale = useLocale();
  return (
    <RadioGroup
      value={value}
      onChange={onChange}
      classNames={{
        wrapper: "flex flex-row flex-wrap gap-5"
      }}
    >
      {(locale === "zh-CN" ? CCLicensesDataListZhcn : CCLicensesDataListEN).map((item) => (
        <CustomRadio key={item.value} value={item.value} description={item.description} icons={item.icons} onChange={onChange}>{item.label}</CustomRadio>
      ))}
    </RadioGroup>
  );
}
