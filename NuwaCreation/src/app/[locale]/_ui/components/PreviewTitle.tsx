"use client";
import React from "react";

function PreviewTitle({children}: {
  children: React.ReactNode,
}) {
  return (
    <>   
      <div className="text-black text-[32px] font-semibold leading-[58px] tracking-tight px-">{children}</div>
    </>
  );
}

export default PreviewTitle;
