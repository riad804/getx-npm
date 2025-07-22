'use client';

import { useEffect } from 'react';
import {useTheme} from "../src";
import * as React from "react";

export function ThemeProvider({ children }: { children: React.ReactNode }) {
    const { theme } = useTheme();

    useEffect(() => {
        // Apply theme classes to document
        document.documentElement.classList.toggle('dark', theme.name === 'dark');

        // Apply CSS variables
        const root = document.documentElement;
        root.style.setProperty('--primary', theme.colors.primary);
        root.style.setProperty('--secondary', theme.colors.secondary);
        root.style.setProperty('--background', theme.colors.background);
        root.style.setProperty('--text', theme.colors.text);
        root.style.setProperty('--error', theme.colors.error);
        root.style.setProperty('--success', theme.colors.success);
    }, [theme]);

    return <>{children}</>;
}