// MyButton.tsx
import {extendVariants, Button} from "@nextui-org/react";

const NuwaButton = extendVariants(Button, {
  variants: {
    // <- modify/add variants
    color: {
      black: "text-white bg-[#0D0D0D]",
      gray: "bg-[#D7D7D7] text-[#020202]",
    },
    isDisabled: {
    },
    size: {
    },
  },
  defaultVariants: { // <- modify/add default variants
    color: "black"
  },
  compoundVariants: [ // <- modify/add compound variants
    {
      isDisabled: "true",
      color: "black",
      class: "bg-[#84cc16]/80 opacity-100",
    },
  ],
});

export default NuwaButton;