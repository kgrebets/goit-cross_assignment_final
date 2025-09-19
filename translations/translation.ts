export type Language = "en" | "ua";

export type TranslationKeys = "boxes" | "scan" | "settings" | "appLanguage" | "boxDetails" | "createBox" | "search" | "addBox" | "scanStatusIdle" | "scanStatusScanning" | "scanStatusWaiting" | "scanStatusNotFound" | "scanStatusFound";

export type Translations = {
  [key in Language]: {
    [k in TranslationKeys]: string;
  };
};

export const translations: Translations = {
  en: {
    boxes: "My Boxes",
    scan: "Scan",
    settings: "Settings",
    appLanguage: "App language",
    boxDetails: "Box details",
    createBox: "Create box",
    search: "Search",
    addBox: "Add box",

    scanStatusIdle: "Ready to scan",
    scanStatusScanning: "Scanning...",
    scanStatusWaiting: "Checking on server...",
    scanStatusNotFound: "Box not found",
    scanStatusFound: "Box found",
  },
  ua: {
    boxes: "Мої коробки",
    scan: "Сканувати",
    settings: "Налаштування",
    appLanguage: "Мова застосунку",
    boxDetails: "Деталі коробки",
    createBox: "Створити коробку",
    search: "Пошук",
    addBox: "Додати коробку",
    scanStatusIdle: "Готовий до сканування",
    scanStatusScanning: "Сканування...",
    scanStatusWaiting: "Перевірка на сервері...",
    scanStatusNotFound: "Коробку не знайдено",
    scanStatusFound: "Коробку знайдено",
  }
};
