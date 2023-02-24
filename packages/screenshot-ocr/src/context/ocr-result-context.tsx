import React, { createContext, useContext } from 'react';

export interface IOCRResultContext {
  url: string;
  width: number;
  height: number;
}

const initialContext: IOCRResultContext = {
  url: '',
  width: 0,
  height: 0,
};

export const OCRResultContext = createContext(initialContext);

export const useOCRResultContext = () => {
  return useContext(OCRResultContext);
};

export function OCRResultContextProvider(props: IOCRResultContext & { children?: React.ReactNode }) {
  const { children, ...defaultContext } = props;

  return <OCRResultContext.Provider value={defaultContext}>{children}</OCRResultContext.Provider>;
}
