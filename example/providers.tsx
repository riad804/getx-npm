'use client';
import {useEffect} from "react";
import {themeService, translation} from "../src";
// @ts-ignore
import {ThemeProvider} from "./ThemeProvider";
// @ts-ignore
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