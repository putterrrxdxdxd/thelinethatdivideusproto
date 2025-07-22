type Plugin = {
  name: string;
  mount: (container: HTMLElement) => void;
  unmount?: (container: HTMLElement) => void;
};

// Preloaded plugins array (empty for now)
const plugins: Plugin[] = [
  { name: 'dragdrop', mount: DragDropPlugin.default.mount, unmount: DragDropPlugin.default.unmount },
  { name: 'interact', mount: InteractPlugin.default.mount, unmount: InteractPlugin.default.unmount },
  { name: 'filters', mount: FiltersPlugin.default.mount, unmount: FiltersPlugin.default.unmount },
  { name: 'gas', mount: GasPlugin.default.mount, unmount: GasPlugin.default.unmount },
  { name: 'audio', mount: AudioPlugin.default.mount, unmount: AudioPlugin.default.unmount },
  { name: 'video', mount: VideoPlugin.default.mount, unmount: VideoPlugin.default.unmount },
  { name: 'image', mount: ImagePlugin.default.mount, unmount: ImagePlugin.default.unmount },
];

// Mount all plugins into their own containers
function loadPlugins() {
  const stage = document.getElementById('stage');
  if (!stage) {
    console.error('Stage element not found!');
    return;
  }

  plugins.forEach((plugin) => {
    const container = document.createElement('div');
    container.id = `plugin-${plugin.name}`;
    container.style.position = 'absolute';
    container.style.width = '100%';
    container.style.height = '100%';
    container.style.pointerEvents = 'none';
    stage.appendChild(container);

    console.log(`Mounting plugin: ${plugin.name}`);
    plugin.mount(container);
  });
}

function unloadPlugins() {
  plugins.forEach((plugin) => {
    const container = document.getElementById(`plugin-${plugin.name}`);
    if (container && plugin.unmount) {
      console.log(`Unmounting plugin: ${plugin.name}`);
      plugin.unmount(container);
      container.remove();
    }
  });
}

window.addEventListener('DOMContentLoaded', () => {
  console.log('Core Renderer loaded');
  loadPlugins();
});

import * as DragDropPlugin from '@theline/plugins-dragdrop';
import * as InteractPlugin from '@theline/plugins-interact';
import * as FiltersPlugin from '@theline/plugins-filters';
import * as GasPlugin from '@theline/plugins-gas';
import * as AudioPlugin from '@theline/plugins-audio';
import * as VideoPlugin from '@theline/plugins-video';
import * as ImagePlugin from '@theline/plugins-image';
