import { setupFilters, teardownFilters, updateFiltersForElement, resetFiltersForElement } from './utils.js';

const FiltersPlugin = {
  mount(container: HTMLElement) {
    console.log('[FiltersPlugin] Mounted');
    setupFilters(container);
  },

  unmount(container: HTMLElement) {
    console.log('[FiltersPlugin] Unmounted');
    teardownFilters(container);
  },

  update(elementId: string, filters: Partial<FiltersState>) {
    console.log(`[FiltersPlugin] Updating filters for ${elementId}`);
    updateFiltersForElement(elementId, filters);
  },

  reset(elementId: string) {
    console.log(`[FiltersPlugin] Resetting filters for ${elementId}`);
    resetFiltersForElement(elementId);
  }
};

export default FiltersPlugin;

// Types for filters
export type FiltersState = {
  blur?: number;         // px
  brightness?: number;   // 0–2
  contrast?: number;     // 0–2
  grayscale?: number;    // 0–1
  invert?: boolean;      // true/false
  opacity?: number;      // 0–1
};
