import type { StageElement } from './types.js';
export declare const api: {
    addElement(element: StageElement): void;
    updateElement(id: string, metadataPatch: Partial<StageElement["metadata"]>): void;
    removeElement(id: string): void;
    on(event: string, handler: (...args: any[]) => void): void;
};
