import { GetXController } from "./controller";
export declare function put<T extends GetXController>(instance: T, { permanent }?: {
    permanent?: boolean;
}): T;
export declare function find<T extends GetXController>(type: new () => T): T;
export declare function deleteInstance<T extends GetXController>(type: new () => T): void;
