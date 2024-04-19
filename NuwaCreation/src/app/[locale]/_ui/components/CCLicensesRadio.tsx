import React from "react";
import {RadioGroup, Radio, useRadio, VisuallyHidden, RadioProps, cn} from "@nextui-org/react";
import Image from "next/image";
import { useLocale } from "next-intl";

const CCLicensesDataListZHCN = [
  {
    value: "CC0",
    label: "CC 0（公共领域奉献）",
    description: "在法律允许的范围内，放弃其在全球范围内对该作品享有的所有权利，从而将该作品奉献给公共领域。 其他人可以复制、修改、分发和使用该作品，并可用于商业目的，而无需征求许可。",
  },
  {
    value: "CCBY",
    label: "CC BY（署名）",
    description: "允许他人以任何目、任何媒介，甚至商业目的的使用作品，只要提供适当的署名给原作",
  },
  {
    value: "CCBYNC",
    label: "CC BY-NC（署名-非商业使用）",
    description: "允许他人以任何目的使用作品，但不允许用于商业目的",
  },
  {
    value: "CCBYND",
    label: "CC BY-ND（署名-禁止演绎）",
    description: "允许他人下载作品并与他人共享，但不允许对作品进行修改，或以其为基础的进行新的创作",
  },
  {
    value: "CCBYSA",
    label: "CC BY-SA（署名-相同方式共享）",
    description: "允许他人以任何目的使用、修改、演绎作品，但新的作品必须使用相同的许可协议",
  },
  {
    value: "CCBYNCND",
    label: "CC BY-NC-ND（署名-非商业性使用-禁止演绎）",
    description: "允许他人以任何目的使用和分发作品，但新的作品必须使用相同的许可协议。不允许商业性使用，必须提供适当的署名给作者，禁止对作品进行修改。",
  },
  {
    value: "CCBYNCSA",
    label: "CC BY-NC-SA（署名-非商业性使用-相同方式共享）",
    description: "允许他人以任何目的使用、修改、演绎作品，但新的作品必须使用相同的许可协议。不允许商业性使用，必须提供适当的署名给作者。",
  }
]

const CCLicensesDataListEN = [
  {
    value: "CC0",
    label: "CC 0（公共领域奉献）en",
    description: "在法律允许的范围内，放弃其在全球范围内对该作品享有的所有权利，从而将该作品奉献给公共领域。 其他人可以复制、修改、分发和使用该作品，并可用于商业目的，而无需征求许可。",
  },
  {
    value: "CCBY",
    label: "CC BY（署名）",
    description: "允许他人以任何目、任何媒介，甚至商业目的的使用作品，只要提供适当的署名给原作",
  },
  {
    value: "CCBYNC",
    label: "CC BY-NC（署名-非商业使用）",
    description: "允许他人以任何目的使用作品，但不允许用于商业目的",
  },
  {
    value: "CCBYND",
    label: "CC BY-ND（署名-禁止演绎）",
    description: "允许他人下载作品并与他人共享，但不允许对作品进行修改，或以其为基础的进行新的创作",
  },
  {
    value: "CCBYSA",
    label: "CC BY-SA（署名-相同方式共享）",
    description: "允许他人以任何目的使用、修改、演绎作品，但新的作品必须使用相同的许可协议",
  },
  {
    value: "CCBYNCND",
    label: "CC BY-NC-ND（署名-非商业性使用-禁止演绎）",
    description: "允许他人以任何目的使用和分发作品，但新的作品必须使用相同的许可协议。不允许商业性使用，必须提供适当的署名给作者，禁止对作品进行修改。",
  },
  {
    value: "CCBYNCSA",
    label: "CC BY-NC-SA（署名-非商业性使用-相同方式共享）",
    description: "允许他人以任何目的使用、修改、演绎作品，但新的作品必须使用相同的许可协议。不允许商业性使用，必须提供适当的署名给作者。",
  }
]

const CustomRadio = (props: RadioProps) => {
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
        "group inline-flex items-center justify-left hover:bg-content2 flex-row",
        "max-w-[620px] cursor-pointer border-2 border-default rounded-lg gap-4 p-4",
        "data-[selected=true]:border-black"
      )}
    >
      <VisuallyHidden>
        <input {...getInputProps()} />
      </VisuallyHidden>
      <span {...getWrapperProps()} className={cn(
          "w-4 h-4 rounded-[25px] opacity-100 shrink-0",
          isSelected ? "bg-black" : "bg-zinc-300",
        )}
      >
        <span {...getControlProps()} className={cn(
          "bg-black w-[41px] h-[41px] rounded-[25px] opacity-0",
          isSelected ? "opacity-100" : "opacity-0",
        )} />
      </span>
      <Image
        className="shrink-0"
        width={82}
        height={29}
        src={`/CCLicenses-${props.value}.png`}
        alt=""
      />
      <div {...getLabelWrapperProps()}>
        
        {children && <span {...getLabelProps()} className="text-black text-base leading-[29px] tracking-tight">{children}</span>}
        {description && (
          <span className=" text-black text-[10px] font-normal leading-[18px] tracking-tight">{description}</span>
        )}
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
    >
      {(locale === "zh-CN" ? CCLicensesDataListZHCN : CCLicensesDataListEN).map((item) => (
        <CustomRadio key={item.value} value={item.value} description={item.description}>{item.label}</CustomRadio>
      ))}
    </RadioGroup>
  );
}
