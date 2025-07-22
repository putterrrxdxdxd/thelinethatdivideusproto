import { defineConfig } from 'vite';
import path from 'path';

export default defineConfig({
  resolve: {
    alias: {
      '@theline/plugins-dragdrop': path.resolve(__dirname, '../../packages/plugins-dragdrop/dist/index.js'),
      '@theline/plugins-interact': path.resolve(__dirname, '../../packages/plugins-interact/dist/index.js'),
      '@theline/plugins-filters': path.resolve(__dirname, '../../packages/plugins-filters/dist/index.js'),
      '@theline/plugins-gas': path.resolve(__dirname, '../../packages/plugins-gas/dist/index.js'),
      '@theline/plugins-audio': path.resolve(__dirname, '../../packages/plugins-audio/dist/index.js'),
      '@theline/plugins-video': path.resolve(__dirname, '../../packages/plugins-video/dist/index.js'),
      '@theline/plugins-image': path.resolve(__dirname, '../../packages/plugins-image/dist/index.js'),
      '@repo/ui': path.resolve(__dirname, '../../packages/ui/dist/index.js'),
      '@theline/shared': path.resolve(__dirname, '../../packages/shared/dist/index.js'),
    }
  }
}); 