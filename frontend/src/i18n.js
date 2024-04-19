// i18n.js
import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from 'i18next-browser-languagedetector';
import HttpApi from 'i18next-http-backend'; 
import 'bootstrap/dist/js/bootstrap.js'

import 'bootstrap/dist/css/bootstrap.min.css'
import "/node_modules/flag-icons/css/flag-icons.min.css";
i18n
  .use(initReactI18next) 
  .use(LanguageDetector)
  .use(HttpApi)
  .init({
    supportedLngs: ['en', 'fi', 'ne'],
    fallbackLng: "en",
    detection: {
        order: ['cookie', 'htmlTag', 'localStorage', 'navigator', 'path', 'subdomain'],
        caches: ['cookie']
    },
    backend: {
        loadPath: '/locales/{{lng}}/translation.json',
    },
    
   
    react: { 
      useSuspense: false 
    },
    interpolation: {
      escapeValue: false 
    }
    
  });

export default i18n;