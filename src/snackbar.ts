'use client';

import { Rx } from './state';
import {GetXController} from "./controller";

type SnackbarMessage = {
    id: string;
    message: string;
    type: 'success' | 'error' | 'warning' | 'info';
    duration?: number;
};

class SnackbarService extends GetXController {
    private _messages = new Rx<SnackbarMessage[]>([]);

    get messages() {
        return this._messages.value;
    }

    show(message: string, type: SnackbarMessage['type'] = 'info', duration = 3000) {
        const newMessage: SnackbarMessage = {
            id: Math.random().toString(36).substring(2, 9),
            message,
            type,
            duration,
        };

        this._messages.value = [...this._messages.value, newMessage];

        if (duration > 0) {
            setTimeout(() => {
                this.removeMessage(newMessage.id);
            }, duration);
        }
    }

    removeMessage(id: string) {
        this._messages.value = this._messages.value.filter(msg => msg.id !== id);
    }
}

// Singleton instance
export const snackbar = new SnackbarService();