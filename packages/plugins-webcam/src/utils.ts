// @ts-ignore
import DailyIframe, { DailyCall } from '@daily-co/daily-js';
// @ts-ignore
import { emit } from '@theline/shared';

let call: DailyCall | null = null;
let container: HTMLElement | null = null;
let switchButton: HTMLButtonElement | null = null;
let videoDevices: MediaDeviceInfo[] = [];
let currentCamIndex = 0;

const DAILY_API_KEY = "688958658177aeedf2d838f6657ecd0bed85396e1d9e17c6560ed8b4b778f433";

export async function setupWebcam(parent: HTMLElement) {
  container = document.createElement('div');
  container.id = 'daily-container';
  container.style.position = 'absolute';
  container.style.top = '0';
  container.style.left = '0';
  container.style.width = '100%';
  container.style.height = '100%';
  container.style.zIndex = '9999';
  parent.appendChild(container);

  call = DailyIframe.createCallObject();

  const devices = await navigator.mediaDevices.enumerateDevices();
  videoDevices = devices.filter((d) => d.kind === 'videoinput');
  if (videoDevices.length === 0) {
    console.error('❌ No cameras found');
    return;
  }
  console.log('📸 Available cameras:', videoDevices.map((d) => d.label));

  await joinWithCamera(videoDevices[currentCamIndex].deviceId);

  // Keyboard shortcut
  window.addEventListener('keydown', handleKeyDown);

  // On-screen switch button
  addSwitchButton(parent);
}

export function teardownWebcam(parent: HTMLElement) {
  if (call) {
    call.leave();
    call.destroy();
    call = null;
  }
  if (container) {
    parent.removeChild(container);
    container = null;
  }
  if (switchButton) {
    parent.removeChild(switchButton);
    switchButton = null;
  }
  window.removeEventListener('keydown', handleKeyDown);
  videoDevices = [];
  currentCamIndex = 0;
}

async function joinWithCamera(deviceId: string) {
  const roomURL = 'https://testtheline.daily.co/thelinev2test';
  await call?.setInputDevicesAsync({ videoDeviceId: deviceId });
  await call?.join({ url: roomURL });
  console.log(`🎥 Joined room with camera: ${deviceId}`);
}

async function cycleCamera() {
  if (!call || videoDevices.length <= 1) return;

  currentCamIndex = (currentCamIndex + 1) % videoDevices.length;
  const nextDevice = videoDevices[currentCamIndex];
  await call.setInputDevicesAsync({ videoDeviceId: nextDevice.deviceId });
  console.log(`🔄 Switched to camera: ${nextDevice.label}`);

  // Fix: Get local participant's session_id using participants()
  const participants = call.participants();
  const localParticipant = Object.values(participants).find((p: any) => p.local);
  emit('stage:updateElement', {
    id: `webcam-${localParticipant?.session_id}`,
    metadataPatch: {
      video: { cameraLabel: nextDevice.label }
    }
  });
}

function handleKeyDown(e: KeyboardEvent) {
  if (e.key.toLowerCase() === 'c') {
    cycleCamera();
  }
}

function addSwitchButton(parent: HTMLElement) {
  switchButton = document.createElement('button');
  switchButton.innerText = '🔄 Switch Camera';
  switchButton.style.position = 'absolute';
  switchButton.style.bottom = '20px';
  switchButton.style.right = '20px';
  switchButton.style.padding = '10px 15px';
  switchButton.style.fontSize = '16px';
  switchButton.style.background = 'rgba(0,0,0,0.6)';
  switchButton.style.color = 'white';
  switchButton.style.border = 'none';
  switchButton.style.borderRadius = '6px';
  switchButton.style.cursor = 'pointer';
  switchButton.style.zIndex = '10000';

  switchButton.addEventListener('click', cycleCamera);
  parent.appendChild(switchButton);
}
