const i18n = require('i18next');
const Backend = require('i18next-fs-backend');
const middleware = require('i18next-http-middleware');

i18n
  .use(Backend)
  .use(middleware.LanguageDetector)
  .init({
    supportedLngs: ['en', 'fi', 'ne'],
    fallbackLng: 'en',
    detection: {
      order: ['header', 'querystring', 'cookie'],
      caches: ['cookie']
    },
    backend: {
      loadPath: './locales/{{lng}}/translation.json',
    },
    interpolation: {
      escapeValue: false
    }
  });

module.exports = i18n;
