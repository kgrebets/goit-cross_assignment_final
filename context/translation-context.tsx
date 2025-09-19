import React, { createContext, useContext, useState, ReactNode } from "react";
import { Language, TranslationKeys, translations } from "../translations/translation"; 

export type TranslationContextType = {
  lang: Language;
  setLang: (lang: Language) => void;
  t: (key: TranslationKeys) => string;
};

const TranslationContext = createContext<TranslationContextType | undefined>(undefined);

export function TranslationProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Language>("en");

  const t = (key: TranslationKeys) => translations[lang][key];

  return (
    <TranslationContext.Provider value={{ lang, setLang, t }}>
      {children}
    </TranslationContext.Provider>
  );
}

export function useTranslation() {
  const context = useContext(TranslationContext);
  if (!context) {
    throw new Error("useTranslation must be used within a TranslationProvider");
  }
  return context;
}
