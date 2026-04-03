"use client";

import { createContext, useContext, useState, ReactNode, useEffect } from 'react';

type Locale = 'en' | 'tr';

interface LanguageContextType {
    locale: Locale;
    setLocale: (locale: Locale) => void;
    t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

// Simple dictionary for key translations
const dictionary: Record<Locale, Record<string, string>> = {
    en: {
        // Nav
        "nav.home": "HOME",
        "nav.shop": "CATALOG",
        "nav.about": "OUR STORY",
        "nav.contact": "GET QUOTE",
        "nav.search": "Search",
        "nav.cart": "Quote List",

        // Hero
        "hero.tagline": "WHOLESALE NATURAL SKINCARE",
        "hero.title": "Direm Silk & Skin",
        "hero.subtitle": "Premium bulk supply of authentic Turkish Rose Oil and botanical formulations from Isparta. Scientifically fortified for global brands.",
        "hero.cta.shop": "BROWSE CATALOG",
        "hero.cta.about": "OUR ORIGINS",

        // Brand Story
        "story.tagline": "FROM ISPARTA TO THE WORLD",
        "story.title": "Authentic, Natural & Scientifically Proven.",
        "story.desc1": "Our journey begins in the rose gardens of Isparta, Turkey, the world's capital of Rosa Damascena. We harvest the purest blooms to create 100% natural, steam-distilled rose oil and botanical extracts.",
        "story.desc2": "Backed by research from Ankara University professors, we combine traditional harvesting with modern scientific formulation to ensure stability and potency for your bulk needs.",
        "story.natural": "100% Isparta Rose",
        "story.science": "University Backed",
        "story.eco": "Sustainable Bulk",
        "story.link": "DISCOVER OUR PROCESS",

        // Products
        "products.collection": "WHOLESALE CATALOG",
        "products.featured": "Bulk Best Sellers",
        "products.view_all": "View Full Catalog",
        "product.add_cart": "REQUEST QUOTE",
        "product.get_quote": "REQUEST QUOTE",

        // Shop
        "shop.title": "Wholesale Catalog",
        "shop.desc": "Browse our premium range of essential oils, serums, and creams available for private label and bulk export.",

        // Cart (Legacy/Unused mostly but good to update)
        "cart.title": "Quote Request",
        "cart.empty": "No items in quote request.",
        "cart.total": "Estimated Value",
        "cart.checkout": "SUBMIT REQUEST",
        "cart.note": "Final pricing provided upon inquiry.",

        // General
        "footer.rights": "All rights reserved. Global Wholesale Division.",
        "footer.desc": "Connecting global brands with the purest Turkish botanical ingredients. Specialized in bulk rose oil and scientific skincare formulations.",
    },
    tr: {
        // Turkish removed - system forced to English
    }
};

export function LanguageProvider({ children }: { children: ReactNode }) {
    const [locale, setLocale] = useState<Locale>('en'); // Default to English for US Wholesale
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
        // Could load from localStorage here
    }, []);

    const t = (key: string) => {
        return dictionary[locale][key] || key;
    };

    // Ensure children are always rendered, provider wraps them always.
    // We use isMounted to perhaps avoid mismatch if we were using localStorage, 
    // but since default is 'en', we can just render.

    return (
        <LanguageContext.Provider value={{ locale, setLocale, t }}>
            {children}
        </LanguageContext.Provider>
    );
}

export function useLanguage() {
    const context = useContext(LanguageContext);
    if (context === undefined) {
        throw new Error('useLanguage must be used within a LanguageProvider');
    }
    return context;
}
