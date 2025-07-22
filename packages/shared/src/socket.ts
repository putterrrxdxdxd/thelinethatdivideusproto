import { io, Socket } from 'socket.io-client';

let socketInstance: Socket | null = null;

export function getSocket(url?: string): Socket {
  if (!socketInstance) {
    const serverUrl = url || process.env.SOCKET_SERVER_URL || 'http://localhost:3000';
    socketInstance = io(serverUrl);

    console.log(`[Shared] Socket.IO connected to ${serverUrl}`);

    socketInstance.on('connect', () => {
      console.log('[Shared] Connected:', socketInstance?.id);
    });
    socketInstance.on('disconnect', (reason) => {
      console.warn('[Shared] Disconnected:', reason);
    });
  }
  return socketInstance;
}

/**
 * Plugin-friendly emit helper
 * @example emit('move', { id, x, y })
 */
export function emit(event: string, ...args: any[]): void {
  getSocket().emit(event, ...args);
}

/**
 * Plugin-friendly on helper
 * @example on('spawn', (data) => { ... })
 */
export function on(event: string, handler: (...args: any[]) => void): void {
  getSocket().on(event, handler);
}
