"use client";
import React, { useState } from "react";
import { useTranslations } from "next-intl";

function WorldBook_Entry_Wrapper({children}: {
  children: React.ReactNode,
}) {
  return (
    <div className="rounded-[40px] bg-white">   
      {children}
    </div>
  );
}

export default WorldBook_Entry_Wrapper;
