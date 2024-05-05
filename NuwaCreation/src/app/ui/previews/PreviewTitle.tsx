"use client";
import React from "react";

function PreviewTitle({children}: {
  children: React.ReactNode,
}) {
  return (
    <>   
      <div className="text-black text-2xl font-semibold font-light leading-9 tracking-tight mb-2">{children}</div>
    </>
  );
}

export default PreviewTitle;
