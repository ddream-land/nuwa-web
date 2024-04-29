"use client";
import React from "react";
import CreatorInfo_Language from "./CreatorInfo_Language";
import CreatorInfo_Level from "./CreatorInfo_Level";
import CreatorInfo_CCLicenses from "./CreatorInfo_CCLicenses";
import CreatorInfo_CharacterVersion from "./CreatorInfo_CharacterVersion";
import CreatorInfo_CreatedBy from "./CreatorInfo_CreatedBy";
import CreatorInfo_CreatorNotes from "./CreatorInfo_CreatorNotes";

function CreatorInfo() {
  
  return (
    <>
      <div className="grid grid-cols-1 gap-8 sm:grid-cols-10 mb-20">
        <div className="sm:col-start-3 sm:col-end-9 grid gap-20">
          <div className="grid grid-cols-1 gap-20 sm:grid-cols-2">
            <CreatorInfo_CreatedBy />
            <CreatorInfo_CharacterVersion />
          </div>
          <CreatorInfo_CreatorNotes />
          <CreatorInfo_Language />
          <CreatorInfo_Level />
          <CreatorInfo_CCLicenses />
        </div>
      </div>
    </>
  );
}

export default CreatorInfo;
