import React, { createContext, useState, useRef, useEffect } from 'react';
import { i18n } from '../../common';

export interface ILanguageContext {
  nation: 'zh-CN' | 'en-US';
  updateNation: (payload: ILanguageContext['nation']) => void;
}

const initialContext: ILanguageContext = {
  nation: 'zh-CN',
  updateNation: () => Promise.reject('please using LanguageProvider first!!!'),
};

export const LanguageContext = createContext(initialContext);

export default function LanguageProvider(props: { children?: React.ReactNode }) {
  const [loaded, setLoaded] = useState(false);
  const [nation, setNation] = useState(initialContext.nation);
  const i18nInitializedRef = useRef(false);

  const fetchLanguage = async (payload: ILanguageContext['nation']) => {
    if (!i18nInitializedRef.current) {
      await i18n.initialize(payload);
      i18nInitializedRef.current = true;
      setLoaded(true);
    } else {
      await i18n.changeLanguage(payload);
    }
  };

  const updateNation = (payload: ILanguageContext['nation']) => {
    setNation(payload);
  };

  const value = {
    nation,
    updateNation,
  };

  useEffect(() => {
    fetchLanguage(nation);
  }, [nation]);

  return <LanguageContext.Provider value={value}>{loaded ? props.children : null}</LanguageContext.Provider>;
}
