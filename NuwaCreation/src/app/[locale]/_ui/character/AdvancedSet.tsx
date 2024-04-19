"use client";
import React from "react";
import AdvancedSet_Base from "./AdvancedSet_Base";
import AdvancedSet_Talkativeness from "./AdvancedSet_Talkativeness";

function AdvancedSet() {
  
  return (
    <>   
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 py-7">
        <div className="min-h-[630px]">
          <AdvancedSet_Base />
        </div>
        <div className="h-full" >
          <AdvancedSet_Talkativeness />
        </div>
      </div>
    </>
  );
}

export default AdvancedSet;
