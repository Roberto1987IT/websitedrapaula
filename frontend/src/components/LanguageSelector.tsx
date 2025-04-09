import React from "react";
import { useTranslation } from "react-i18next";

const LanguageSelector = () => {
    const { i18n } = useTranslation();
    const currentLanguage = i18n.language.toUpperCase(); // Текущий язык (например, "PT" или "EN")

    const changeLanguage = (lang: string) => {
        i18n.changeLanguage(lang.toLowerCase()); // Меняем язык через i18n
        localStorage.setItem("language", lang.toLowerCase()); // Сохраняем выбор языка
    };

    return (
        <div className="language-selector desktop">
            {["PT", "EN"].map((lang) => (
                <button
                    key={lang}
                    className={currentLanguage === lang ? "active" : ""}
                    onClick={() => changeLanguage(lang)}
                    aria-pressed={currentLanguage === lang}
                >
                    {lang} {lang === "PT" ? "🇵🇹" : "🇬🇧"}
                </button>
            ))}
        </div>
    );
};

export default LanguageSelector;