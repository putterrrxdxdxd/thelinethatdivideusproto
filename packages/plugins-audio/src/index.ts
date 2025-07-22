import { stageState } from '@theline/shared';
import type { StageElement } from '@theline/shared';
import { setupAudio, teardownAudio } from './utils';

const AudioPlugin = {
  mount(container: HTMLElement) {
    console.log('[AudioPlugin] Mounted');
    Object.values(stageState.elements).forEach((el: StageElement) => {
      if (el.type === 'audio') {
        setupAudio(container, el.id, el.metadata.audio?.src ?? '');
      }
    });
  },
  unmount(container: HTMLElement) {
    console.log('[AudioPlugin] Unmounted');
    teardownAudio(container);
  }
};

export default AudioPlugin;
