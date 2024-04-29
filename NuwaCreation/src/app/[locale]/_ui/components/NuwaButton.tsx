// MyButton.tsx
import {extendVariants, Button} from "@nextui-org/react";

const NuwaButton = extendVariants(Button, {
  variants: {
    // <- modify/add variants
    color: {
      black: "text-white bg-[#0D0D0D]",
      gray: "bg-[#D7D7D7] text-[#020202]",
      white: "bg-white text-[#020202]",
    },
    isDisabled: {
    },
    size: {
    },
    shadowghost: {
      default: "shadow-none",
      white: "shadow text-sm h-11 rounded-3xl border-none bg-white text-neutral-800",
      black: "shadow text-sm h-10 rounded-3xl border border-black border-solid bg-white text-black"
    }
  },
  defaultVariants: { // <- modify/add default variants
    color: "black",
    shadowghost: "default",
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