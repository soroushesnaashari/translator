
export interface Language {
  code: string;
  name: string;
  nativeName: string;
}

export const languages: Language[] = [
  { code: 'en', name: 'English', nativeName: 'English' },
  { code: 'es', name: 'Spanish', nativeName: 'Español' },
  { code: 'fr', name: 'French', nativeName: 'Français' },
  { code: 'de', name: 'German', nativeName: 'Deutsch' },
  { code: 'it', name: 'Italian', nativeName: 'Italiano' },
  { code: 'pt', name: 'Portuguese', nativeName: 'Português' },
  { code: 'ru', name: 'Russian', nativeName: 'Русский' },
  { code: 'zh', name: 'Chinese', nativeName: '中文' },
  { code: 'ja', name: 'Japanese', nativeName: '日本語' },
  { code: 'ko', name: 'Korean', nativeName: '한국어' },
  { code: 'ar', name: 'Arabic', nativeName: 'العربية' },
  { code: 'hi', name: 'Hindi', nativeName: 'हिन्दी' },
  { code: 'fa', name: 'Persian', nativeName: 'فارسی' },
  { code: 'tr', name: 'Turkish', nativeName: 'Türkçe' },
  { code: 'nl', name: 'Dutch', nativeName: 'Nederlands' },
  { code: 'pl', name: 'Polish', nativeName: 'Polski' },
];

export const translatorTitle: { [key: string]: string } = {
  en: 'Translator',
  es: 'Traductor',
  fr: 'Traducteur',
  de: 'Übersetzer',
  it: 'Traduttore',
  pt: 'Tradutor',
  ru: 'Переводчик',
  zh: '翻译',
  ja: '翻訳者',
  ko: '번역가',
  ar: 'مترجم',
  hi: 'अनुवादक',
  fa: 'مترجم',
  tr: 'Çevirmen',
  nl: 'Vertaler',
  pl: 'Tłumacz',
};
