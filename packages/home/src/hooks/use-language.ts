import { useContext } from 'react';
import { LanguageContext } from '../context';

export default function useLanguage() {
  return useContext(LanguageContext);
}
