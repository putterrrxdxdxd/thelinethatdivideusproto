import { stageState, emit } from '@theline/shared';

export function setupImageElement(container: HTMLElement, id: string, metadata: any) {
  const img = document.createElement('img');
  img.id = id;
  img.src = metadata?.src ?? '';
  img.style.position = 'absolute';
  img.style.left = `${metadata?.manipulation?.x || 0}px`;
  img.style.top = `${metadata?.manipulation?.y || 0}px`;
  img.style.width = `${metadata?.manipulation?.width || 200}px`;
  img.style.height = `${metadata?.manipulation?.height || 200}px`;
  img.dataset.stageElement = 'true';
  img.draggable = false;

  // Apply filters if present
  applyFilters(img, metadata?.filters);

  container.appendChild(img);
}

export function teardownImageElement(container: HTMLElement) {
  const images = container.querySelectorAll('[data-stage-element][id^="image-"]');
  images.forEach((el) => el.remove());
}

function applyFilters(img: HTMLImageElement, filters: any = {}) {
  const filterString = `
    blur(${filters.blur ?? 0}px)
    brightness(${filters.brightness ?? 1})
    contrast(${filters.contrast ?? 1})
    grayscale(${filters.grayscale ?? 0})
    ${filters.invert ? 'invert(1)' : ''}
  `.trim();

  img.style.filter = filterString;
  img.style.opacity = (filters.opacity ?? 1).toString();
}
