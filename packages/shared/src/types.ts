// 🌱 Base Metadata structure for all elements
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
    invert?: boolean;
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
  [key: string]: any; // 🔥 For future plugins (e.g., MIDI, 3D)
};

// 🌟 Helper type for plugin-specific metadata slices
export type PluginMetadata<K extends keyof Metadata> = Partial<Metadata[K]>;

// 🎨 The universal Stage Element type
export type StageElement = {
  id: string; // Unique ID for each element (e.g., 'video-123')
  type: 'video' | 'image' | 'text' | 'audio' | string; // Type of element
  metadata: Metadata; // All plugin metadata lives here
};

// 🧑‍🤝‍🧑 Full stage state for reactive store
export type StageState = {
  elements: Record<string, StageElement>;
  history: Record<string, StageElement>[];
  future: Record<string, StageElement>[];
};
