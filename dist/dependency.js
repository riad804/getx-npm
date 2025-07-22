'use client';
const _instances = new Map();
export function put(instance, { permanent = false } = {}) {
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
    return _instances.get(key);
}
export function find(type) {
    const key = type.name;
    if (!_instances.has(key)) {
        put(new type());
    }
    return _instances.get(key);
}
export function deleteInstance(type) {
    const key = type.name;
    if (_instances.has(key)) {
        const instance = _instances.get(key);
        instance.dispose();
        _instances.delete(key);
    }
}
