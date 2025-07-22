'use client';
class GetStorage {
    constructor(storage = localStorage) {
        this.storage = storage;
    }
    write(key, value) {
        this.storage.setItem(key, JSON.stringify(value));
    }
    read(key) {
        const value = this.storage.getItem(key);
        return value ? JSON.parse(value) : null;
    }
    remove(key) {
        this.storage.removeItem(key);
    }
    erase() {
        this.storage.clear();
    }
}
// Singleton instance
export const storage = new GetStorage();
