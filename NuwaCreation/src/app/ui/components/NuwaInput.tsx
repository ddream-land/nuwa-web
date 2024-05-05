"use client";
import { Input } from "@nextui-org/react";
import React from "react";

function NuwaInput(...props: any) {
  return (
    <div>
      <label className="text-neutral-800 text-2xl font-bold tracking-tight mb-6 block">
        {props[0].label}
      </label>
      <Input
        {...props[0]}
        label=""
        variant="bordered"
        labelPlacement="outside"
        size="lg"
        classNames={{
          input: "text-black text-sm font-normal leading-relaxed tracking-tight",
          inputWrapper: "border"
        }}
        className="border-none outline-none w-full resize-none text-[#272727] disabled:bg-transparent"
      />
    </div>
      
  );
}

export default NuwaInput;
