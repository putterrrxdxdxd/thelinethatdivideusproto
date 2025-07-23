const withTM = require('next-transpile-modules')([
  '@theline/shared',
  '@theline/plugins-audio',
  '@theline/plugins-dragdrop',
  '@theline/plugins-filters',
  '@theline/plugins-gas',
  '@theline/plugins-image',
  '@theline/plugins-interact',
  '@theline/plugins-video',
  '@theline/plugins-webcam'
]);

/** @type {import('next').NextConfig} */
const nextConfig = {
  // ...your existing config
};

module.exports = withTM(nextConfig);
