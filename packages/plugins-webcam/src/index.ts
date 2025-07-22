import { setupWebcam, teardownWebcam } from './utils';

const WebcamPlugin = {
  mount(container: HTMLElement) {
    console.log('[WebcamPlugin] Mounted');
    setupWebcam(container);
  },
  unmount(container: HTMLElement) {
    console.log('[WebcamPlugin] Unmounted');
    teardownWebcam(container);
  }
};

export default WebcamPlugin;
