let gasContainer: HTMLElement | null = null;

export function setupGas(container: HTMLElement) {
  gasContainer = container;
}

export function teardownGas(container: HTMLElement) {
  calm();
  gasContainer = null;
}

// 🌫️ Global effects
export function intensify(level = 1) {
  if (!gasContainer) return;
  const intensity = Math.min(level, 5);
  const allElements = gasContainer.querySelectorAll('[data-stage-element]');
  allElements.forEach((el: Element) => applyGas(el as HTMLElement, intensity));
}

export function calm() {
  if (!gasContainer) return;
  const allElements = gasContainer.querySelectorAll('[data-stage-element]');
  allElements.forEach((el: Element) => resetGas(el as HTMLElement));
}

// 🌬️ Per-element effects
export function updateElementGas(
  elementId: string,
  options: { wobble?: boolean, intensity?: number }
) {
  // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
  const el = document.getElementById(elementId);
  if (!el) {
    console.warn(`[GasPlugin] No element found with id ${elementId}`);
    return;
  }
  if (options.wobble) {
    applyGas(el, options.intensity ?? 1);
  } else {
    resetGas(el);
  }
}

export function resetElementGas(elementId: string) {
  const el = document.getElementById(elementId);
  if (el) resetGas(el);
}

// 💨 Apply wobble/distortion
function applyGas(el: HTMLElement, intensity = 1) {
  el.style.animation = `gasWobble ${2 / intensity}s infinite alternate ease-in-out`;
  el.style.filter = `blur(${intensity}px) hue-rotate(${intensity * 30}deg)`;
}

// 🛑 Reset element visuals
function resetGas(el: HTMLElement) {
  el.style.animation = '';
  el.style.filter = '';
}
