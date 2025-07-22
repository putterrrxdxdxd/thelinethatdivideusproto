import { setupDropZone, teardownDropZone } from './utils';

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

export default DragDropPlugin;
