import interact from 'interactjs';
import { setupInteract, teardownInteract } from './utils.js';

const InteractPlugin = {
  mount(container: HTMLElement) {
    console.log('[InteractPlugin] Mounted');
    setupInteract(container);
  },
  unmount(container: HTMLElement) {
    console.log('[InteractPlugin] Unmounted');
    teardownInteract(container);
  }
};

export * from './utils.js';
export const __forceExport = true;

export default InteractPlugin;
