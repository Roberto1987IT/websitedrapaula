import "i18next";

// Определите интерфейс с вашими ключами переводов
declare module "i18next" {
  interface CustomTypeOptions {
    defaultNS: "translation"; // Название неймспейса
    resources: {
      translation: typeof import("../public/locales/en/translation.json"); // Привязываем JSON-файл
    };
  }
}