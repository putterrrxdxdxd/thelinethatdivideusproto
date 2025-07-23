import {
    setupGas,
    teardownGas,
    intensify,
    calm,
    updateElementGas,
    resetElementGas
  } from './utils.js';
  
  const GasPlugin = {
    mount(container: HTMLElement) {
      console.log('[GasPlugin] Mounted');
      setupGas(container);
    },
    unmount(container: HTMLElement) {
      console.log('[GasPlugin] Unmounted');
      teardownGas(container);
    },
    intensify(level = 1) {
      console.log(`[GasPlugin] Intensify stage (level ${level})`);
      intensify(level);
    },
    calm() {
      console.log('[GasPlugin] Calm stage');
      calm();
    },
    update(elementId: string, options: { wobble?: boolean, intensity?: number }) {
      updateElementGas(elementId, options);
    },
    reset(elementId: string) {
      resetElementGas(elementId);
    }
  };
  
  export default GasPlugin;
  