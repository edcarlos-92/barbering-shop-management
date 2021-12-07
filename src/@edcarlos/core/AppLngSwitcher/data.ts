export interface LanguageProps {
  languageId: string;
  locale: string;
  name: string;
}

const languageData: LanguageProps[] = [
  {
    languageId: "english",
    locale: "en",
    name: "English",
  },
  {
    languageId: "french",
    locale: "fr",
    name: "Français",
  },

  /*
  {
    languageId: "french",
    locale: "fr",
    name: "français",
  },


  {
    languageId: "chinese",
    locale: "zh",
    name: "中国人",
  },
  {
    languageId: "spanish",
    locale: "es",
    name: "Español",
  },
  
  {
    languageId: "italian",
    locale: "it",
    name: "Italiano",
  },
  {
    languageId: "saudi-arabia",
    locale: "ar",
    name: "عربي",
  },
  */
];
export default languageData;
