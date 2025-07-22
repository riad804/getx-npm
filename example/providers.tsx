'use client';
import {useEffect} from "react";
import {themeService} from "../src/theme";
import {translation} from "../src/translation";
import {ThemeProvider} from "./ThemeProvider";
import {SnackbarWrapper} from "./SnackbarWrapper";

export function Providers({ children }: { children: React.ReactNode }) {
    // Initialize default theme
    useEffect(() => {
        themeService.setTheme(
            window.matchMedia('(prefers-color-scheme: dark)').matches
                ? 'dark'
                : 'light'
        );
    }, []);

    // Load translations
    useEffect(() => {
        fetch('/api/translations')
            .then(res => res.json())
            .then(data => translation.addTranslations(data));
    }, []);

    return (
        <ThemeProvider>
            {children}
            <SnackbarWrapper />
        </ThemeProvider>
    );
}