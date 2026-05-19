import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import fr from './fr.json';

export const SUPPORTED_LOCALES = ['fr'] as const;
export type Locale = (typeof SUPPORTED_LOCALES)[number];

void i18n
  .use(initReactI18next)
  .init({
    resources: { fr: { translation: fr } },
    lng: 'fr',
    fallbackLng: 'fr',
    interpolation: { escapeValue: false },
    compatibilityJSON: 'v4',
  });

export default i18n;
