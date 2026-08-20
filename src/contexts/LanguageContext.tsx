"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";
import { Language, siteContent } from "@/data/siteContent";

interface LanguageContextType {
    language: Language;
    setLanguage: (lang: Language) => void;
    t: typeof siteContent.ko;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
    const [language, setLanguage] = useState<Language>("ko");

    const t = siteContent[language];

    return (
        <LanguageContext.Provider value={{ language, setLanguage, t }}>
            {children}
        </LanguageContext.Provider>
    );
}

export function useLanguage() {
    const context = useContext(LanguageContext);
    if (context === undefined) {
        throw new Error("useLanguage must be used within a LanguageProvider");
    }
    return context;
}
