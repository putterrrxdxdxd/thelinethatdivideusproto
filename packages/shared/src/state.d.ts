import type { StageElement } from './types.js';
type StageState = {
    elements: Record<string, StageElement>;
    history: Record<string, StageElement>[];
    future: Record<string, StageElement>[];
};
export declare const stageState: StageState;
export declare function addElement(element: StageElement): void;
export declare function updateElement(id: string, metadataPatch: Partial<StageElement['metadata']>): void;
export declare function removeElement(id: string): void;
export declare function undo(): void;
export declare function redo(): void;
export {};
