// 🔥 Deep merge two objects (multi-plugin safe)
export function deepMerge<T extends Record<string, any>>(target: T, source: Partial<T>): T {
  const output = { ...target };
  for (const key in source) {
    if (
      Object.prototype.hasOwnProperty.call(source, key) &&
      typeof source[key] === 'object' && source[key] !== null &&
      Object.prototype.hasOwnProperty.call(target, key)
    ) {
      (output as any)[key] = deepMerge((target as any)[key], source[key]);
    } else {
      (output as any)[key] = source[key];
    }
  }
  return output;
}
// ⚡ Throttle a function (limits calls during drag/resize)
export function throttle<T extends (...args: any[]) => void>(fn: T, limit: number): T {
  let lastCall = 0;
  return function (...args: any[]) {
    const now = Date.now();
    if (now - lastCall >= limit) {
      lastCall = now;
      fn(...args);
    }
  } as T;
}

// 📦 Deep clone utility (for history snapshots)
export function clone<T>(obj: T): T {
  if (typeof structuredClone === 'function') {
    return structuredClone(obj);
  }
  // Fallback for older environments
  return JSON.parse(JSON.stringify(obj));
}

// 🎨 Generate random unique ID
export function generateId(prefix = 'el'): string {
  return `${prefix}-${Math.random().toString(36).substr(2, 9)}`;
}

// 🌈 Random color (for element styling/debug)
export function randomColor(): string {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

// 🎯 Random position (for spawning new elements)
export function randomPosition(maxX = 800, maxY = 600) {
  return { x: Math.random() * maxX, y: Math.random() * maxY };
}
