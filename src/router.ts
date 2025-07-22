'use client';

import { useRouter } from 'next/navigation';

export class GetXRouter {
    private static _router: ReturnType<typeof useRouter>;

    static initialize(router: ReturnType<typeof useRouter>) {
        this._router = router;
    }

    static push(path: string) {
        this._router.push(path);
    }

    static replace(path: string) {
        this._router.replace(path);
    }

    static back() {
        this._router.back();
    }
}

// Usage in _app.tsx or layout.tsx
export function RouterInitializer() {
    const router = useRouter();
    GetXRouter.initialize(router);
    return null;
}

// Then anywhere in your app:
function navigateToAbout() {
    GetXRouter.push('/about');
}