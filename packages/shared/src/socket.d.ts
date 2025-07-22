import { Socket } from 'socket.io-client';
export declare function getSocket(url?: string): Socket;
/**
 * Plugin-friendly emit helper
 * @example emit('move', { id, x, y })
 */
export declare function emit(event: string, ...args: any[]): void;
/**
 * Plugin-friendly on helper
 * @example on('spawn', (data) => { ... })
 */
export declare function on(event: string, handler: (...args: any[]) => void): void;
