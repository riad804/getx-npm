'use client';

import {GetXController} from "./controller";
import {Rx, useRx} from "./state";

type TranslationValue = string | Record<string, any>;
type Translations = Record<string, Record<string, TranslationValue>>;

class TranslationService extends GetXController {
    private _locale = new Rx<string>('en');
    private _translations = new Rx<Translations>({});

    get locale() {
        return this._locale.value;
    }

    set locale(newLocale: string) {
        this._locale.value = newLocale;
    }

    addTranslations(newTranslations: Translations) {
        this._translations.value = this.deepMerge(
            this._translations.value,
            newTranslations
        );
    }

    private deepMerge(target: Translations, source: Translations): Translations {
        const output = { ...target };
        for (const key in source) {
            if (source.hasOwnProperty(key)) {
                if (this.isObject(target[key]) && this.isObject(source[key])) {
                    output[key] = this.deepMerge(
                        target[key] as Translations,
                        source[key] as Translations
                    );
                } else {
                    output[key] = source[key];
                }
            }
        }
        return output;
    }

    private isObject(item: any): boolean {
        return item && typeof item === 'object' && !Array.isArray(item);
    }

    private getTranslationValue(keys: string[], translations: any): string | undefined {
        return keys.reduce((obj, key) => (obj && obj[key] !== undefined ? obj[key] : undefined), translations);
    }

    translate(key: string, params: Record<string, string> = {}): string {
        const keys = key.split('.');
        const currentLocale = this._locale.value;

        // Try to get translation for current locale
        let translation = this.getTranslationValue(
            [...keys, currentLocale],
            this._translations.value
        );

        // If not found, try to get the raw value (might be a string)
        if (translation === undefined) {
            translation = this.getTranslationValue(keys, this._translations.value);
        }

        // Fallback to English if not found in current locale
        if (translation === undefined && currentLocale !== 'en') {
            translation = this.getTranslationValue(
                [...keys, 'en'],
                this._translations.value
            ) || this.getTranslationValue(keys, this._translations.value);
        }

        // Final fallback to last key part
        if (translation === undefined) {
            translation = keys[keys.length - 1];
        }

        // Ensure we have a string (in case nested object was found)
        const translationString = typeof translation === 'string'
            ? translation
            : keys[keys.length - 1];

        // Parameter replacement
        return translationString.replace(/{(\w+)}/g, (_, param) => params[param] || `{${param}}`);
    }
}

// Singleton instance
export const translation = new TranslationService();

// Hook for components
export function useTranslate() {
    const locale = useRx(translation['_locale']);
    const translations = useRx(translation['_translations']);

    return (key: string, params?: Record<string, string>) => {
        return translation.translate(key, params);
    };
}