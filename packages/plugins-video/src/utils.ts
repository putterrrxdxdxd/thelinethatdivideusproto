const videoElements = new Map<string, HTMLVideoElement>();

export function setupVideo(container: HTMLElement, id: string, src: string) {
  if (videoElements.has(id)) return; // Already exists

  const video = document.createElement('video');
  video.id = id;
  video.src = src;
  video.controls = true;
  video.autoplay = true;
  video.loop = true;
  video.style.position = 'absolute';
  video.style.top = '0';
  video.style.left = '0';
  video.style.maxWidth = '50%';
  video.style.maxHeight = '50%';
  video.dataset.stageElement = 'true';

  container.appendChild(video);
  videoElements.set(id, video);

  console.log(`[VideoPlugin] Rendered video: ${id}`);
}

export function teardownVideo(container: HTMLElement) {
  videoElements.forEach((video) => {
    container.removeChild(video);
  });
  videoElements.clear();
  console.log('[VideoPlugin] All videos removed');
}
