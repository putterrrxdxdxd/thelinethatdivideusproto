"use client";

import React, { useEffect, useRef } from 'react';
import * as DragDropPlugin from '@theline/plugins-dragdrop';
import * as InteractPlugin from '@theline/plugins-interact';
import * as FiltersPlugin from '@theline/plugins-filters';
import * as GasPlugin from '@theline/plugins-gas';
import * as AudioPlugin from '@theline/plugins-audio';
import * as VideoPlugin from '@theline/plugins-video';
import * as ImagePlugin from '@theline/plugins-image';

const plugins = [
  { name: 'dragdrop', mount: DragDropPlugin.default.mount, unmount: DragDropPlugin.default.unmount },
  { name: 'interact', mount: InteractPlugin.default.mount, unmount: InteractPlugin.default.unmount },
  { name: 'filters', mount: FiltersPlugin.default.mount, unmount: FiltersPlugin.default.unmount },
  { name: 'gas', mount: GasPlugin.default.mount, unmount: GasPlugin.default.unmount },
  { name: 'audio', mount: AudioPlugin.default.mount, unmount: AudioPlugin.default.unmount },
  { name: 'video', mount: VideoPlugin.default.mount, unmount: VideoPlugin.default.unmount },
  { name: 'image', mount: ImagePlugin.default.mount, unmount: ImagePlugin.default.unmount },
];

export const Canvas: React.FC = () => {
  const stageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const stage = stageRef.current;
    if (!stage) return;
    // Clean up any previous plugin containers
    while (stage.firstChild) stage.removeChild(stage.firstChild);
    // Mount plugins
    plugins.forEach((plugin) => {
      const container = document.createElement('div');
      container.id = `plugin-${plugin.name}`;
      container.style.position = 'absolute';
      container.style.width = '100%';
      container.style.height = '100%';
      container.style.pointerEvents = 'none';
      stage.appendChild(container);
      plugin.mount(container);
    });
    return () => {
      plugins.forEach((plugin) => {
        const container = document.getElementById(`plugin-${plugin.name}`);
        if (container && plugin.unmount) {
          plugin.unmount(container);
          container.remove();
        }
      });
    };
  }, []);

  return <div id="stage" ref={stageRef} style={{ position: 'relative', width: '100%', height: '100vh', overflow: 'hidden' }} />;
}; 