"use client";
import React from "react";
import InforMation_FirstMessage from "./InforMation_FirstMessage";
import InforMation_Cover from "./InforMation_Cover";
import InforMation_Name from "./InforMation_Name";
import InforMation_Personality from "./InforMation_Personality";
import InforMation_Description from "./InforMation_Description"
import InforMation_AlternateGreetings from "./InforMation_AlternateGreetings"

function InforMation() {
  
  return (
    <div>   
      <div className="grid grid-cols-1 gap-8 sm:grid-cols-10 mb-20">

        <div className="sm:col-start-3 sm:col-end-5">
          <InforMation_Cover />
        </div>
        
        <div
          className="sm:col-start-5 sm:col-end-9 flex flex-col gap-12"
        >
          <InforMation_Name />
  
          <InforMation_Personality />
          
          <InforMation_Description />
          <div>
            <InforMation_FirstMessage />
            <InforMation_AlternateGreetings />
          </div>
        </div>
      </div>
    </div>
  );
}

export default InforMation;
