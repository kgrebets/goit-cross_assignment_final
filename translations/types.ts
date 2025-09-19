type Language = "en" | "ua";

type Translations = {
  [key in Language]: {
    settings: string;
  };
};