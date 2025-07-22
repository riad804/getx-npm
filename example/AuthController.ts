'use client';

import {GetXController} from "../src/controller";
import {Rx} from "../src/state";
import {snackbar} from "../src/snackbar";
import {translation} from "../src/translation";

interface User {
    id: string;
    name: string;
    email: string;
}

export class AuthController extends GetXController {
    user = new Rx<User | null>(null);
    isLoading = new Rx<boolean>(false);

    async login(email: string, password: string) {
        this.isLoading.value = true;

        try {
            const response = await fetch('/api/login', {
                method: 'POST',
                body: JSON.stringify({ email, password }),
            });

            if (response.ok) {
                const user = await response.json();
                this.user.value = user;
                snackbar.show(translation.translate('login.success'));
            } else {
                throw new Error(await response.text());
            }
        } catch (error) {
            snackbar.show(
                error instanceof Error ? error.message : translation.translate('login.error'),
                'error'
            );
        } finally {
            this.isLoading.value = false;
        }
    }

    logout() {
        this.user.value = null;
        snackbar.show(translation.translate('logout.success'));
    }

    onInit() {
        // Try to restore session on init
        this.restoreSession();
    }

    private async restoreSession() {
        try {
            const response = await fetch('/api/session');
            if (response.ok) {
                this.user.value = await response.json();
            }
        } catch (error) {
            console.error('Session restore failed:', error);
        }
    }
}