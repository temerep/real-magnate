import { createI18n } from 'vue-i18n';
import en from '../locales/en';
import ru from '../locales/ru';

// List of CIS language codes that should use 'ru'
const cisLanguages = ['ru', 'uk', 'be', 'kk', 'uz', 'tg', 'ky', 'az', 'hy', 'tk'];

const getLocale = () => {
  // Check localStorage first
  const storedLocale = localStorage.getItem('locale');
  if (storedLocale && ['en', 'ru'].includes(storedLocale)) {
    return storedLocale;
  }

  // Get language from Telegram or default to 'en'
  const telegramLocale = window.Telegram?.WebApp?.initDataUnsafe?.user?.language_code || 'en';
  
  // Set 'ru' for CIS languages, otherwise 'en'
  const selectedLocale = cisLanguages.includes(telegramLocale) ? 'ru' : 'en';
  
  // Save selected locale to localStorage
  localStorage.setItem('locale', selectedLocale);
  return selectedLocale;
};

const i18n = createI18n({
    legacy: false,
    locale: getLocale(),
    fallbackLocale: 'en',
    messages: {
        en,
        ru,
    },
});

export default i18n;