"use client";
import React from "react";
import Plot_Plot from "./Plot_Plot";
import Plot_WorldBook from "./Plot_WorldBook";

function Plot() {
  
  return (
    <>
      <div className="grid grid-cols-1 gap-8 sm:grid-cols-10">
        <div className="sm:col-start-3 sm:col-end-9 grid gap-20">
          <Plot_Plot />
          <Plot_WorldBook />
        </div>
      </div>
    </>
  );
}

export default Plot;
