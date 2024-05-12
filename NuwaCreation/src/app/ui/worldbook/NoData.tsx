"use client"

import React from "react";
import Image from "next/image";


export default function NoData() {
  return (
    <>
      <div className="w-full h-full flex flex-col items-center justify-center pt-20">
        <Image
          src='/NoData.png'
          width={100}
          height={100}
          alt=""
          className="h-auto w-auto flex-none rounded-[40px] object-cover"
        />
        <div className="text-sm">There is no digital life yet, click on the top right corner to create one~</div>
      </div>
    </>
  );
}
