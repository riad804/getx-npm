'use client';
import { useEffect, useState } from 'react';
export class Rx {
    constructor(initialValue) {
        this.listeners = [];
        this._value = initialValue;
    }
    get value() {
        return this._value;
    }
    set value(newValue) {
        if (this._value !== newValue) {
            this._value = newValue;
            this.notifyListeners();
        }
    }
    subscribe(listener) {
        this.listeners.push(listener);
        return () => {
            this.listeners = this.listeners.filter(l => l !== listener);
        };
    }
    notifyListeners() {
        this.listeners.forEach(listener => listener(this._value));
    }
}
// Hook to use Rx in components
export function useRx(rx) {
    const [value, setValue] = useState(rx.value);
    useEffect(() => {
        return rx.subscribe(setValue);
    }, [rx]);
    return value;
}
