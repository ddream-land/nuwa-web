import React from "react";
import {useRadio, Chip, VisuallyHidden, tv, RadioGroup} from "@nextui-org/react";

const radio = tv({
  slots: {
    base: "border-black hover:bg-gray-200 bg-white h-[41px] rounded-[25px]",
    content: "text-black w-[155px] text-center"
  },
  variants: {
    isSelected: {
      true: {
        base: "border-black bg-black hover:bg-black-500 hover:border-black-500",
        content: "text-white pl-1"
      }
    },
    isFocusVisible: {
      true: { 
        base: "outline-none ring-2 ring-focus ring-offset-2 ring-offset-background",
      }
    }
  }
})

const CustomRadio = (props : any) => {
  const {
    children,
    isSelected,
    isFocusVisible,
    getBaseProps,
    getLabelProps,
    getInputProps,
  } = useRadio({
    ...props
  })

  const styles = radio({ isSelected, isFocusVisible })

  return (
    <label {...getBaseProps()}>
      <VisuallyHidden>
        <input {...getInputProps()} />
      </VisuallyHidden>
      <Chip
        classNames={{
          base: styles.base(),
          content: styles.content(),
        }}
        color="primary"
        variant="faded"
        {...getLabelProps()}
      >
        {children ? children : isSelected ? "Enabled" : "Disabled"}
      </Chip>
    </label>
  );
}


export default function NuwaRadio({items, value, onChange}: {
  items: {name: string, value: string}[],
  value: string,
  onChange: (e: any) => void
}) {
  return (
    <div className="flex flex-col gap-1 w-full">
      <RadioGroup
        className="gap-1"
        orientation="horizontal"
        value={value}
        onChange={onChange}
      >
        {items.map((item) => (
          <CustomRadio key={item.value} value={item.value}>{item.name}</CustomRadio>
        ))}
      </RadioGroup>
    </div>
  );
}

