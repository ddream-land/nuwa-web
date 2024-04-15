"use client";
import React from "react";
import Scenario_Scenario from "./Scenario_Scenario";
import Scenario_WorldBook from "./Scenario_WorldBook";

function Scenario() {
  
  return (
    <>   
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 py-7">
        <div className="h-[630px]">
          <Scenario_Scenario />
        </div>
        <div className="h-[630px]" >
          <Scenario_WorldBook />
        </div>

      </div>
    </>
  );
}

export default Scenario;
