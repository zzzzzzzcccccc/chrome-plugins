import React, { createContext, useState, useRef, useEffect } from 'react';
import { i18n } from '../../common';
import { SESSION_KEYS } from '../../constants';
import { storage } from '../../utils';

export interface ILanguageContext {
  nation: string;
  updateNation: (payload?: string) => void;
  loading: boolean;
}

const initialContext: ILanguageContext = {
  nation: 'en-US',
  updateNation: () => Promise.reject('please using LanguageProvider first!!!'),
  loading: false,
};

export const LanguageContext = createContext(initialContext);

export default function LanguageProvider(props: { children?: React.ReactNode }) {
  const [loaded, setLoaded] = useState(false);
  const [nation, setNation] = useState(storage.get(SESSION_KEYS.language) || initialContext.nation);
  const [loading, setLoading] = useState(false);
  const i18nInitializedRef = useRef(false);

  const fetchLanguage = async (payload: string) => {
    if (!i18nInitializedRef.current) {
      setLoading(true);
      await i18n.initialize(payload);
      i18nInitializedRef.current = true;
      setLoaded(true);
      setLoading(false);
    } else {
      setLoading(true);
      await i18n.changeLanguage(payload);
      setLoading(false);
    }
  };

  const updateNation = (payload?: string) => {
    if (payload) {
      storage.set(SESSION_KEYS.language, payload);
      setNation(payload);
    }
  };

  const value = {
    nation,
    updateNation,
    loading,
  };

  useEffect(() => {
    fetchLanguage(nation);
  }, [nation]);

  return <LanguageContext.Provider value={value}>{loaded ? props.children : null}</LanguageContext.Provider>;
}
