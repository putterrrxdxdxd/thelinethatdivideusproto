import { stageState } from '@theline/shared';
import type { StageElement } from '@theline/shared';
import { setupImageElement, teardownImageElement } from './utils';

const ImagePlugin = {
  mount(container: HTMLElement) {
    console.log('[ImagePlugin] Mounted');
    Object.values(stageState.elements).forEach((el: StageElement) => {
      if (el.type === 'image') {
        setupImageElement(container, el.id, el.metadata);
      }
    });
  },
  unmount(container: HTMLElement) {
    console.log('[ImagePlugin] Unmounted');
    teardownImageElement(container);
  }
};

export default ImagePlugin;
