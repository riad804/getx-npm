'use client';

import {GetXController} from "./controller";

type Constructor<T = any> = new (...args: any[]) => T;
type InstanceRecord<T = any> = {
    instance: T;
    permanent: boolean;
    scope?: string;
};
const _instances = new Map<string, InstanceRecord>();
const _scopes = new Map<string, Map<string, InstanceRecord>>();

export function put<T extends GetXController>(
    instance: T,
    { permanent = false, scope }: { permanent?: boolean; scope?: string } = {}
): T {
    const key = instance.constructor.name;
    const record: InstanceRecord = { instance, permanent, scope };

    if (scope) {
        if (!_scopes.has(scope)) {
            _scopes.set(scope, new Map());
        }
        const scopedMap = _scopes.get(scope)!;
        if (!scopedMap.has(key)) {
            instance.initialize();
            scopedMap.set(key, record);
        }
        return scopedMap.get(key)!.instance as T;
    } else {
        if (!_instances.has(key)) {
            instance.initialize();
            if (!permanent && typeof window !== 'undefined') {
                window.addEventListener('beforeunload', () => instance.dispose());
            }
            _instances.set(key, record);
        }
        return _instances.get(key)!.instance as T;
    }
}

export function find<T extends GetXController>(
    type: Constructor<T>,
    scope?: string
): T {
    const key = type.name;

    if (scope) {
        const scopedMap = _scopes.get(scope);
        if (scopedMap?.has(key)) {
            return scopedMap.get(key)!.instance as T;
        }

        // Not found, create
        return put(new type(), { scope });
    }

    if (_instances.has(key)) {
        return _instances.get(key)!.instance as T;
    }

    // Not found, create
    return put(new type());
}

export function deleteInstance<T extends GetXController>(
    type: Constructor<T>,
    scope?: string
) {
    const key = type.name;

    if (scope) {
        const scopedMap = _scopes.get(scope);
        if (scopedMap?.has(key)) {
            scopedMap.get(key)!.instance.dispose();
            scopedMap.delete(key);
        }
        return;
    }

    if (_instances.has(key)) {
        _instances.get(key)!.instance.dispose();
        _instances.delete(key);
    }
}

export function clearScope(scope: string) {
    const scopedMap = _scopes.get(scope);
    if (scopedMap) {
        scopedMap.forEach(record => record.instance.dispose());
        _scopes.delete(scope);
    }
}

export function dispose<T extends GetXController>(
    type: Constructor<T>,
    scope?: string
) {
    deleteInstance(type, scope);
}