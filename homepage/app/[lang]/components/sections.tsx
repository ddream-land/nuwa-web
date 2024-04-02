"use client";

import React from 'react'
import Fullpage, { FullPageSections, FullpageSection } from '@ap.cx/react-fullpage'

export default function Sections() {
  return (
    <Fullpage style={{
      position: 'fixed',
      top: 200,
      left: 0,
      right: 0,
    }}>

      <FullPageSections>

        <FullpageSection style={{
          backgroundColor: 'lime',
          height: '80vh',
          padding: '1em',
        }}>1</FullpageSection>
        <FullpageSection style={{
          backgroundColor: 'coral',
          padding: '1em',
        }}>2</FullpageSection>
        <FullpageSection style={{
          backgroundColor: 'firebrick',
          padding: '1em',
        }}>3</FullpageSection>

      </FullPageSections>

    </Fullpage>
  );
}
