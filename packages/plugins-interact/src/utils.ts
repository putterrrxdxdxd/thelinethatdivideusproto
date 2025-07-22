import interact from 'interactjs';

export function setupInteract(container: HTMLElement) {
  interact('.draggable')
    .draggable({
      listeners: {
        move(event) {
          const target = event.target as HTMLElement;
          const x = (parseFloat(target.dataset.x || '0') || 0) + event.dx;
          const y = (parseFloat(target.dataset.y || '0') || 0) + event.dy;

          target.style.transform = `translate(${x}px, ${y}px)`;
          target.dataset.x = x.toString();
          target.dataset.y = y.toString();
        }
      }
    })
    .resizable({
      edges: { left: true, right: true, bottom: true, top: true },
      listeners: {
        move(event) {
          const target = event.target as HTMLElement;
          target.style.width = `${event.rect.width}px`;
          target.style.height = `${event.rect.height}px`;
        }
      }
    });
}

export function teardownInteract(container: HTMLElement) {
interact('.draggable').unset();
}
