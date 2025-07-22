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