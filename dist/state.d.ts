type Listener<T> = (value: T) => void;
export declare class Rx<T> {
    private _value;
    private listeners;
    constructor(initialValue: T);
    get value(): T;
    set value(newValue: T);
    subscribe(listener: Listener<T>): () => void;
    private notifyListeners;
}
export declare function useRx<T>(rx: Rx<T>): T;
export {};
