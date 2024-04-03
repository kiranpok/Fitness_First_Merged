import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import HttpApi from "i18next-http-backend";

import 'bootstrap/dist/js/bootstrap.min.js';
import 'bootstrap/dist/css/bootstrap.min.css';


i18n.use(initReactI18next)
    .use(LanguageDetector)
    .use(HttpApi)
    .init({
    supportedLngs: ["en","ne", "fi"],
    fallbackLng: "en",
    detection: {
        order: [
            "cookie", "htmlTag","localStorage","navigator","path","subdomain",
        ],
        caches:["cookie"],

    },
    backend: {
        loadPath:"local/{{lng}}/translation.json",
    } ,
    react:{
        useSuspense: false,
    },
    interpolation: {
        escapeValue:false,
    },



});


export default i18n;
