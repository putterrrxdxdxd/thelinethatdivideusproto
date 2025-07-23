import { stageState } from '@theline/shared';
import type { StageElement } from '@theline/shared';
import { setupVideo, teardownVideo } from './utils.js';

const VideoPlugin = {
  mount(container: HTMLElement) {
    console.log('[VideoPlugin] Mounted');
    Object.values(stageState.elements).forEach((el: StageElement) => {
      if (el.type === 'video') {
        setupVideo(container, el.id, el.metadata.video?.src ?? '');
      }
    });
  },
  unmount(container: HTMLElement) {
    console.log('[VideoPlugin] Unmounted');
    teardownVideo(container);
  }
};

export default VideoPlugin;
