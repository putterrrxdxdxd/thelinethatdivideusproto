const audioElements = new Map<string, HTMLAudioElement>();

export function setupAudio(container: HTMLElement, id: string, src: string) {
  if (audioElements.has(id)) return; // Already exists

  const audio = document.createElement('audio');
  audio.id = id;
  audio.src = src;
  audio.controls = true;
  audio.autoplay = true;
  audio.loop = true;
  audio.dataset.stageElement = 'true';

  container.appendChild(audio);
  audioElements.set(id, audio);

  console.log(`[AudioPlugin] Rendered audio: ${id}`);
}

export function teardownAudio(container: HTMLElement) {
  audioElements.forEach((audio) => {
    container.removeChild(audio);
  });
  audioElements.clear();
  console.log('[AudioPlugin] All audios removed');
}
