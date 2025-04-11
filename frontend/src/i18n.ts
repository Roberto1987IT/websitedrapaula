import i18n from "i18next";
import {initReactI18next} from "react-i18next";
import HttpApi from "i18next-http-backend";
import LanguageDetector from "i18next-browser-languagedetector";


// Инициализация i18next
i18n
    .use(HttpApi)
    .use(LanguageDetector)
    .use(initReactI18next) // Интеграция с React
    .init({
        fallbackLng: "pt",
        supportedLngs: ["en", "pt"],
        debug: true,
        interpolation: {
            escapeValue: false, // Без экранизации для вставки HTML
        },
        backend: {
            loadPath: "/locales/{{lng}}/translation.json", // Путь к JSON-файлам
        },
        detection: {
            order: ["localStorage", "cookie", "navigator", "htmlTag"], // Определение языка
            caches: ["localStorage"], // Сохранение выбора языка
        },
    });

export default i18n;
