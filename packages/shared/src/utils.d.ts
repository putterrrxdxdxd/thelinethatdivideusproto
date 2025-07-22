export declare function deepMerge<T extends Record<string, any>>(target: T, source: Partial<T>): T;
export declare function throttle<T extends (...args: any[]) => void>(fn: T, limit: number): T;
export declare function clone<T>(obj: T): T;
export declare function generateId(prefix?: string): string;
export declare function randomColor(): string;
export declare function randomPosition(maxX?: number, maxY?: number): {
    x: number;
    y: number;
};
