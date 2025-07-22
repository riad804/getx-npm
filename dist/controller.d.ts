import { Rx } from './state';
export declare abstract class GetXController {
    private _isInitialized;
    onInit(): void;
    onClose(): void;
    initialize(): void;
    dispose(): void;
}
export declare class CounterController extends GetXController {
    count: Rx<number>;
    increment(): void;
    decrement(): void;
    onInit(): void;
    onClose(): void;
}
