export type Metadata = {
    manipulation?: {
        x: number;
        y: number;
        width: number;
        height: number;
        rotation?: number;
        zIndex?: number;
    };
    filters?: {
        blur?: number;
        brightness?: number;
        contrast?: number;
        grayscale?: number;
        invert?: number;
        opacity?: number;
    };
    video?: {
        muted?: boolean;
        playing?: boolean;
        src?: string;
    };
    textEditor?: {
        content: string;
        fontSize?: number;
        color?: string;
        fontFamily?: string;
    };
    [key: string]: any;
};
export type PluginMetadata<K extends keyof Metadata> = Partial<Metadata[K]>;
export type StageElement = {
    id: string;
    type: 'video' | 'image' | 'text' | 'audio' | string;
    metadata: Metadata;
};
export type StageState = {
    elements: Record<string, StageElement>;
    history: Record<string, StageElement>[];
    future: Record<string, StageElement>[];
};
