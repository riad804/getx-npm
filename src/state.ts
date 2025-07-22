'use client';

import {useEffect, useState} from 'react';

type Listener<T> = (value: T) => void;

export class Rx<T> {
    private _value: T;
    private listeners: Listener<T>[] = [];

    constructor(initialValue: T) {
        this._value = initialValue;
    }

    get value(): T {
        return this._value;
    }

    set value(newValue: T) {
        if (this._value !== newValue) {
            this._value = newValue;
            this.notifyListeners();
        }
    }

    subscribe(listener: Listener<T>): () => void {
        this.listeners.push(listener);
        return () => {
            this.listeners = this.listeners.filter(l => l !== listener);
        };
    }

    private notifyListeners() {
        this.listeners.forEach(listener => listener(this._value));
    }
}

// Hook to use Rx in components
export function useRx<T>(rx: Rx<T>): T {
    const [value, setValue] = useState<T>(rx.value);

    useEffect(() => {
        return rx.subscribe(setValue);
    }, [rx]);

    return value;
}