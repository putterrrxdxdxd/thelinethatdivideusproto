import { stageState } from './state.js';
import { getSocket } from './socket.js';
import { deepMerge } from './utils.js';
import type { StageElement } from './types.js';

// Get singleton socket
const socket = getSocket();

export const api = {
  // Add element
  addElement(element: StageElement) {
    stageState.elements[element.id] = element;
    socket.emit('stage:addElement', element);
  },

  // Update element
  updateElement(id: string, metadataPatch: Partial<StageElement['metadata']>) {
    const el = stageState.elements[id];
    if (el) {
      deepMerge(el.metadata, metadataPatch);
      socket.emit('stage:updateElement', { id, metadataPatch });
    } else {
      console.warn(`[API] Tried to update missing element: ${id}`);
    }
  },

  // Remove element
  removeElement(id: string) {
    delete stageState.elements[id];
    socket.emit('stage:removeElement', id);
  },

  // Listen to backend events
  on(event: string, handler: (...args: any[]) => void) {
    socket.on(event, handler);
  }
};
