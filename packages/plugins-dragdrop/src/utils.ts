import { emit } from '@theline/shared';

export function setupDropZone(container: HTMLElement) {
  const dropZone = document.createElement('div');
  dropZone.id = 'drop-zone';
  dropZone.style.position = 'absolute';
  dropZone.style.top = '0';
  dropZone.style.left = '0';
  dropZone.style.right = '0';
  dropZone.style.bottom = '0';
  dropZone.style.zIndex = '9999';
  dropZone.style.pointerEvents = 'none'; // invisible
  container.appendChild(dropZone);

  window.addEventListener('dragover', onDragOver);
  window.addEventListener('drop', onDrop);
}

export function teardownDropZone(container: HTMLElement) {
  const dropZone = document.getElementById('drop-zone');
  if (dropZone) dropZone.remove();
  window.removeEventListener('dragover', onDragOver);
  window.removeEventListener('drop', onDrop);
}

function onDragOver(e: DragEvent) {
  e.preventDefault();
}

function onDrop(e: DragEvent) {
  e.preventDefault();
  if (!e.dataTransfer) return;

  for (const file of Array.from(e.dataTransfer.files)) {
    uploadAndHandleFile(file);
  }
}

async function uploadAndHandleFile(file: File) {
  const formData = new FormData();
  formData.append('file', file);

  try {
    const response = await fetch('http://localhost:3000/media/upload', {
      method: 'POST',
      body: formData
    });

    if (!response.ok) throw new Error('Upload failed');

    const data = await response.json();
    const fileUrl = data.url;
    console.log(`📦 Uploaded ${file.name} → ${fileUrl}`);

    const id = `${file.type.split('/')[0]}-${Date.now()}`;

    if (file.type.startsWith('image/')) {
      emit('spawn', { type: 'image', src: fileUrl, id });
    } else if (file.type.startsWith('video/')) {
      emit('spawn', { type: 'video', src: fileUrl, id });
    } else if (file.type.startsWith('audio/')) {
      emit('spawn', { type: 'audio', src: fileUrl, id });
    } else {
      alert(`Unsupported file type: ${file.type}`);
    }
  } catch (err) {
    console.error('❌ Upload failed:', err);
    alert('Upload failed. Check your backend.');
  }
}
