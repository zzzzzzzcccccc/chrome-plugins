import i18n from 'i18next';
import HttpBackend from 'i18next-http-backend';
import { initReactI18next } from 'react-i18next';

function ConfigI18n() {
  const initialize = async (lng: string) => {
    await i18n
      .use(HttpBackend)
      .use(initReactI18next)
      .init({
        lng,
        fallbackLng: lng, // defining the default/fallback language
        defaultNS: 'app', // defining the default polyglot translation namespace
        ns: ['app'], // defining the list of all polyglot translations namespaces
        backend: {
          crossDomain: true,
          loadPath: (language: string) => {
            return `./locales/${language}/{{ns}}.json`;
          },
          requestOptions: {
            mode: 'cors',
            credentials: 'same-origin',
            cache: 'no-cache',
          },
        },
        keySeparator: false,
        interpolation: {
          escapeValue: false, // not needed for react as it escapes by default
        },
        react: {
          useSuspense: false,
        },
        load: 'currentOnly',
      });
  };

  return {
    initialize,
    changeLanguage: (lng: string) => {
      return i18n.changeLanguage(lng);
    },
  };
}

const configI18n = ConfigI18n();

export default configI18n;
