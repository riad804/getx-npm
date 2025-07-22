'use client';

import { Rx } from './state';

export abstract class GetXController {
    private _isInitialized = false;

    onInit() {}
    onClose() {}

    initialize() {
        if (!this._isInitialized) {
            this.onInit();
            this._isInitialized = true;
        }
    }

    dispose() {
        this.onClose();
        this._isInitialized = false;
    }
}

// Example controller implementation
export class CounterController extends GetXController {
    count = new Rx<number>(0);

    increment() {
        this.count.value += 1;
    }

    decrement() {
        this.count.value -= 1;
    }

    onInit() {
        console.log('CounterController initialized');
    }

    onClose() {
        console.log('CounterController disposed');
    }
}