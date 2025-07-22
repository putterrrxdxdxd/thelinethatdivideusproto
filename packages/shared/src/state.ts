import type { StageElement } from './types';
import { deepMerge, clone } from './utils';

type StageState = {
  elements: Record<string, StageElement>;
  history: Record<string, StageElement>[];
  future: Record<string, StageElement>[];
};

// Create reactive state using Proxy
export const stageState = createReactiveState<StageState>({
  elements: {},
  history: [],
  future: []
});

function createReactiveState<T extends object>(obj: T): T {
  return new Proxy(obj, {
    set(target, key, value) {
      target[key as keyof T] = value;
      // Could trigger a callback or observer here if needed
      return true;
    },
    deleteProperty(target, key) {
      delete target[key as keyof T];
      return true;
    }
  });
}

export function addElement(element: StageElement) {
  stageState.elements[element.id] = element;
  saveHistory();
}

export function updateElement(id: string, metadataPatch: Partial<StageElement['metadata']>) {
  const el = stageState.elements[id];
  if (el) {
    deepMerge(el.metadata, metadataPatch);
    saveHistory();
  }
}

export function removeElement(id: string) {
  delete stageState.elements[id];
  saveHistory();
}

function saveHistory() {
  stageState.history.push(clone(stageState.elements));
  stageState.future = [];
}

export function undo() {
  if (stageState.history.length > 0) {
    stageState.future.push(clone(stageState.elements));
    const prev = stageState.history.pop();
    if (prev) stageState.elements = prev;
  }
}

export function redo() {
  if (stageState.future.length > 0) {
    stageState.history.push(clone(stageState.elements));
    const next = stageState.future.pop();
    if (next) stageState.elements = next;
  }
}
