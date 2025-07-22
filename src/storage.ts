'use client';

class GetStorage {
    private storage: Storage | Map<string, string>;

    constructor(storage: Storage = localStorage) {
        if (typeof window !== 'undefined') {
            this.storage = localStorage;
        } else {
            this.storage = new Map(); // Fallback for SSR or restricted environments
        }
    }

    write<T>(key: string, value: T): void {
        const str = JSON.stringify(value);
        if (this.storage instanceof Map) {
            this.storage.set(key, str);
        } else {
            this.storage.setItem(key, str);
        }
    }

    read<T>(key: string): T | null {
        let str: string | null = null;
        if (this.storage instanceof Map) {
            str = this.storage.get(key) ?? null;
        } else {
            str = this.storage.getItem(key);
        }
        return str ? JSON.parse(str) : null;
    }

    remove(key: string): void {
        if (this.storage instanceof Map) {
            this.storage.delete(key);
        } else {
            this.storage.removeItem(key);
        }
    }

    erase(): void {
        if (this.storage instanceof Map) {
            this.storage.clear();
        } else {
            this.storage.clear();
        }
    }
}

// Singleton instance
export const storage = new GetStorage();