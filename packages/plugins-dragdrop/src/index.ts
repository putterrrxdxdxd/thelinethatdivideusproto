import { setupDropZone, teardownDropZone } from './utils.js';

const DragDropPlugin = {
  mount(container: HTMLElement) {
    console.log('[DragDropPlugin] Mounted');
    setupDropZone(container);
  },
  unmount(container: HTMLElement) {
    console.log('[DragDropPlugin] Unmounted');
    teardownDropZone(container);
  }
};

export * from './utils.js';
export const __forceExport = true;

export default DragDropPlugin;
