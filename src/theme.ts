'use client';

import {GetXController} from "./controller";
import {Rx, useRx} from "./state";

type Theme = {
    name: string;
    colors: {
        primary: string;
        secondary: string;
        background: string;
        text: string;
        error: string;
        success: string;
    };
};

class ThemeService extends GetXController {
    private _theme = new Rx<Theme>({
        name: 'light',
        colors: {
            primary: '#3b82f6',
            secondary: '#10b981',
            background: '#ffffff',
            text: '#111827',
            error: '#ef4444',
            success: '#10b981',
        },
    });

    private _themes: Record<string, Theme> = {
        light: {
            name: 'light',
            colors: {
                primary: '#3b82f6',
                secondary: '#10b981',
                background: '#ffffff',
                text: '#111827',
                error: '#ef4444',
                success: '#10b981',
            },
        },
        dark: {
            name: 'dark',
            colors: {
                primary: '#2563eb',
                secondary: '#059669',
                background: '#111827',
                text: '#f3f4f6',
                error: '#dc2626',
                success: '#059669',
            },
        },
    };

    get theme() {
        return this._theme.value;
    }

    setTheme(name: string) {
        if (this._themes[name]) {
            this._theme.value = this._themes[name];
            if (typeof document !== 'undefined') {
                document.documentElement.classList.toggle('dark', name === 'dark');
            }
        }
    }

    toggleTheme() {
        this.setTheme(this._theme.value.name === 'light' ? 'dark' : 'light');
    }

    addTheme(name: string, theme: Omit<Theme, 'name'>) {
        this._themes[name] = { ...theme, name };
    }
}

// Singleton instance
export const themeService = new ThemeService();

// Hook for components
export function useTheme() {
    const currentTheme = useRx(themeService['_theme']);

    return {
        theme: currentTheme,
        setTheme: themeService.setTheme.bind(themeService),
        toggleTheme: themeService.toggleTheme.bind(themeService),
    };
}