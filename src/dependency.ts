'use client';

import {GetXController} from "./controller";

type Constructor<T = any> = new (...args: any[]) => T;
type InstanceRecord = {
    instance: any;
    permanent: boolean;
    scope?: string;
};

const _instances = new Map<string, InstanceRecord>();
const _scopes = new Map<string, Map<string, InstanceRecord>>();

export class DependencyInjector {
    static put<T extends GetXController>(
        instance: T,
        options: { permanent?: boolean; scope?: string } = {}
    ): T {
        const key = instance.constructor.name;
        const record = <InstanceRecord>{ instance, ...options };

        if (options.scope) {
            // Scoped instance
            if (!_scopes.has(options.scope)) {
                _scopes.set(options.scope, new Map());
            }
            _scopes.get(options.scope)?.set(key, record);
        } else {
            // Global instance
            _instances.set(key, record);
        }

        instance.initialize();
        return instance;
    }

    static find<T extends GetXController>(
        type: Constructor<T>,
        scope?: string
    ): T {
        const key = type.name;

        if (scope) {
            // Look for scoped instance
            const scopedInstances = _scopes.get(scope);
            if (scopedInstances?.has(key)) {
                return scopedInstances.get(key)?.instance as T;
            }
        }

        // Look for global instance
        if (_instances.has(key)) {
            return _instances.get(key)?.instance as T;
        }

        // Create new instance if not found
        const newInstance = new type();
        this.put(newInstance, { scope });
        return newInstance;
    }

    static delete(type: Constructor, scope?: string) {
        const key = type.name;

        if (scope) {
            _scopes.get(scope)?.get(key)?.instance.dispose();
            _scopes.get(scope)?.delete(key);
        } else {
            _instances.get(key)?.instance.dispose();
            _instances.delete(key);
        }
    }

    static clearScope(scope: string) {
        const instances = _scopes.get(scope);
        if (instances) {
            instances.forEach(record => record.instance.dispose());
            _scopes.delete(scope);
        }
    }
}

// Shortcut functions
export const put = DependencyInjector.put;
export const find = DependencyInjector.find;
export const deleteInstance = DependencyInjector.delete;
export const clearScope = DependencyInjector.clearScope;