import { stageState } from '@theline/shared';
import type { FiltersState } from './index.js';

let filtersContainer: HTMLElement | null = null;

export function setupFilters(container: HTMLElement) {
  filtersContainer = container;

  const allElements = container.querySelectorAll('[data-stage-element]') as NodeListOf<HTMLElement>;
  allElements.forEach((el: HTMLElement) => {
    if (el instanceof HTMLElement) {
      el.style.filter = '';
      el.style.opacity = '1';
    }
  });

  // Apply filters to all elements that already have metadata.filters
  Object.values(stageState.elements).forEach((el) => {
    const filters = (el.metadata.filters ?? {}) as Partial<FiltersState>;
    // Ensure invert is boolean or undefined
    const safeFilters: Partial<FiltersState> = {
      ...filters,
      invert: typeof filters.invert === 'boolean' ? filters.invert : undefined
    };
    applyFiltersToElement(el.id, safeFilters);
  });
}

export function teardownFilters(container: HTMLElement) {
  clearAllFilters();
  filtersContainer = null;
}

export function updateFiltersForElement(elementId: string, filters: Partial<FiltersState>) {
  const element = stageState.elements[elementId];
  if (!element) {
    console.warn(`[FiltersPlugin] No stage element found for id ${elementId}`);
    return;
  }

  // Only allow boolean or undefined for invert
  const mergedFilters: Partial<FiltersState> = {
    ...(element.metadata.filters ?? {}),
    ...filters,
    invert: typeof filters.invert === 'boolean' ? filters.invert : undefined
  };

  element.metadata.filters = mergedFilters;
  applyFiltersToElement(elementId, mergedFilters);
}

export function resetFiltersForElement(elementId: string) {
  const element = stageState.elements[elementId];
  if (!element) return;

  element.metadata.filters = {};
  applyFiltersToElement(elementId, {});
}

function applyFiltersToElement(elementId: string, filters: Partial<FiltersState>) {
  const domElement = document.getElementById(elementId);
  if (!domElement) {
    console.warn(`[FiltersPlugin] No DOM element found for id ${elementId}`);
    return;
  }

  // Ensure invert is boolean | undefined
  const safeFilters: Partial<FiltersState> = {
    ...filters,
    invert: typeof filters.invert === 'boolean' ? filters.invert : undefined
  };

  const filterString = `
    blur(${safeFilters.blur ?? 0}px)
    brightness(${safeFilters.brightness ?? 1})
    contrast(${safeFilters.contrast ?? 1})
    grayscale(${safeFilters.grayscale ?? 0})
    ${safeFilters.invert ? 'invert(1)' : ''}
  `.trim();

  domElement.style.filter = filterString;
  domElement.style.opacity = (safeFilters.opacity ?? 1).toString();

  console.log(`[FiltersPlugin] Applied filters to ${elementId}:`, filterString);
}

function clearAllFilters() {
  if (!filtersContainer) return;

  const allElements = filtersContainer.querySelectorAll('[data-stage-element]') as NodeListOf<HTMLElement>;
  allElements.forEach((el: HTMLElement) => {
    if (el instanceof HTMLElement) {
      el.style.filter = '';
      el.style.opacity = '1';
    }
  });

  console.log('[FiltersPlugin] Cleared filters on all elements');
}
let hoveredElement: HTMLElement | null = null;
let keyboardListener: ((e: KeyboardEvent) => void) | null = null;

export function enableKeyboardControls(stage: HTMLElement) {
  stage.addEventListener('mouseover', onHover);
  stage.addEventListener('mouseout', onLeave);
  keyboardListener = onKeyDown;
  window.addEventListener('keydown', keyboardListener);
}

export function disableKeyboardControls(stage: HTMLElement) {
  stage.removeEventListener('mouseover', onHover);
  stage.removeEventListener('mouseout', onLeave);
  if (keyboardListener) {
    window.removeEventListener('keydown', keyboardListener);
    keyboardListener = null;
  }
}

function onHover(e: MouseEvent) {
  const target = e.target as HTMLElement;
  if (target.tagName === 'VIDEO' || target.tagName === 'IMG') {
    hoveredElement = target;
    target.style.outline = '2px solid red';
  }
}

function onLeave(e: MouseEvent) {
  if (e.target === hoveredElement && hoveredElement) {
    if (hoveredElement) hoveredElement.style.outline = 'none';
    hoveredElement = null;
  }
}

function onKeyDown(e: KeyboardEvent) {
  const el: HTMLElement | null = hoveredElement;
  if (!el) return;
  const id = el.dataset.id;
  if (!id) return;
  const filters = getFilters(el);

  switch (e.key.toLowerCase()) {
    case 'g': filters.grayscale = filters.grayscale ? 0 : 100; break;
    case 'b': filters.blur = filters.blur ? 0 : 5; break;
    case 'i': filters.invert = !filters.invert; break; // Toggle boolean
    case 'c': filters.contrast = filters.contrast ? 0 : 150; break;
    case 'l': filters.brightness = filters.brightness ? 0 : 150; break;
    case '[':
      (Object.keys(filters) as (keyof FiltersState)[]).forEach((k) => {
        if (k !== 'opacity' && k !== 'invert') {
          filters[k] = Math.max(0, (filters[k] as number || 0) - 10) as any;
        }
      });
      break;
    case ']':
      (Object.keys(filters) as (keyof FiltersState)[]).forEach((k) => {
        if (k !== 'opacity' && k !== 'invert') {
          filters[k] = Math.min(200, (filters[k] as number || 0) + 10) as any;
        }
      });
      break;
    case 'arrowup':
      filters.opacity = Math.min((filters.opacity || 1) + 0.1, 1);
      break;
    case 'arrowdown':
      filters.opacity = Math.max((filters.opacity || 1) - 0.1, 0);
      break;
  }

  updateFiltersForElement(id, filters);
}

function getFilters(el: HTMLElement): FiltersState {
  const raw = JSON.parse(el.dataset.filters || '{}');
  // Coerce invert to boolean if present
  if ('invert' in raw) {
    raw.invert = Boolean(raw.invert);
  }
  return raw;
}
