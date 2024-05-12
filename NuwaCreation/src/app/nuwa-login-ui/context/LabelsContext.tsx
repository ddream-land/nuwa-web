'use client';

import { createContext, useContext, useState } from 'react';
import enLabels from '../labels/en';
import zhCNLabels from '../labels/zh-CN';

export const LabelsContext = createContext(enLabels);
export function LabelsContextProvider({ locale, children }: {locale: string, children: React.ReactNode}) {

  const getLabels = (locale: string) => {
    return locale === 'en' ? enLabels : zhCNLabels;
  }

  const [labels, setLabels] = useState(getLabels(locale));

  return (
    <LabelsContext.Provider value={labels}>
        {children}
    </LabelsContext.Provider>
  );
}

export function useLabels() {
  return useContext(LabelsContext);
}

