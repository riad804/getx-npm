'use client';
import { useRouter } from 'next/navigation';
class GetxRouter {
    static initialize(router) {
        this._router = router;
    }
    static push(path) {
        this._router.push(path);
    }
    static replace(path) {
        this._router.replace(path);
    }
    static back() {
        this._router.back();
    }
}
// Usage in _app.tsx or layout.tsx
export function RouterInitializer() {
    const router = useRouter();
    GetxRouter.initialize(router);
    return null;
}
// Then anywhere in your app:
function navigateToAbout() {
    GetxRouter.push('/about');
}
