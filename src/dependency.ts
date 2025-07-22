'use client';

import {GetXController} from "./controller";

const _instances = new Map<string, any>();

export function put<T extends GetXController>(
    instance: T,
    { permanent = false }: { permanent?: boolean } = {}
): T {
    const key = instance.constructor.name;
    if (!_instances.has(key)) {
        instance.initialize();
        if (!permanent) {
            // Auto dispose when component unmounts
            if (typeof window !== 'undefined') {
                window.addEventListener('beforeunload', () => {
                    instance.dispose();
                });
            }
        }
        _instances.set(key, instance);
    }
    return _instances.get(key) as T;
}

export function find<T extends GetXController>(type: new () => T): T {
    const key = type.name;
    if (!_instances.has(key)) {
        put(new type());
    }
    return _instances.get(key) as T;
}

export function deleteInstance<T extends GetXController>(type: new () => T) {
    const key = type.name;
    if (_instances.has(key)) {
        const instance = _instances.get(key) as T;
        instance.dispose();
        _instances.delete(key);
    }
}