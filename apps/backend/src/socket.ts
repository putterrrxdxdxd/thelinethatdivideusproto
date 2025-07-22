// src/socket.ts
import { Server, Socket } from 'socket.io';
import { Stage } from './stageModel.js';

export function initSockets(io: Server) {
  io.on('connection', async (socket: Socket) => {
    console.log(`�� New user connected: ${socket.id}`);

    // Load current stage from DB and send to new user
    const stage = await Stage.findOne({ roomId: 'default' });
    if (stage) {
      socket.emit('stage:load', stage.stageState);
      console.log(`📤 Sent current stageState to ${socket.id}`);
    } else {
      console.log('📂 No stage found, sending empty state');
      socket.emit('stage:load', {});
    }

    // Relay and save addElement
    socket.on('stage:addElement', async (data: any) => {
      console.log(`➕ stage:addElement from ${socket.id}`);
      socket.broadcast.emit('stage:addElement', data);
      await saveStageChange(data, 'add');
    });

    // Relay and save updateElement
    socket.on('stage:updateElement', async ({ id, metadataPatch }: { id: string, metadataPatch: any }) => {
      console.log(`✏️ stage:updateElement from ${socket.id}`);
      socket.broadcast.emit('stage:updateElement', { id, metadataPatch });
      await saveStageChange({ id, metadataPatch }, 'update');
    });

    // Relay and save removeElement
    socket.on('stage:removeElement', async (id: string) => {
      console.log(`❌ stage:removeElement from ${socket.id}`);
      socket.broadcast.emit('stage:removeElement', id);
      await saveStageChange(id, 'remove');
    });

    socket.on('disconnect', () => {
      console.log(`👋 User disconnected: ${socket.id}`);
    });
  });
}

// Helper to save changes to DB
async function saveStageChange(data: any, action: 'add' | 'update' | 'remove') {
  const stage = await Stage.findOne({ roomId: 'default' }) || new Stage({ roomId: 'default', stageState: { elements: {} } });
  const elements = stage.stageState.elements || {};

  if (action === 'add') {
    elements[data.id] = data;
  } else if (action === 'update') {
    const el = elements[data.id];
    if (el) {
      Object.assign(el.metadata, data.metadataPatch);
    }
  } else if (action === 'remove') {
    delete elements[data];
  }

  stage.stageState.elements = elements;
  await stage.save();
  console.log(`💾 StageState saved after ${action}`);
}
