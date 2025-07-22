'use client';

class GetStorage {
    private storage: Storage;

    constructor(storage: Storage = localStorage) {
        this.storage = storage;
    }

    write<T>(key: string, value: T): void {
        this.storage.setItem(key, JSON.stringify(value));
    }

    read<T>(key: string): T | null {
        const value = this.storage.getItem(key);
        return value ? JSON.parse(value) : null;
    }

    remove(key: string): void {
        this.storage.removeItem(key);
    }

    erase(): void {
        this.storage.clear();
    }
}

// Singleton instance
export const storage = new GetStorage();