declare class GetStorage {
    private storage;
    constructor(storage?: Storage);
    write<T>(key: string, value: T): void;
    read<T>(key: string): T | null;
    remove(key: string): void;
    erase(): void;
}
export declare const storage: GetStorage;
export {};
