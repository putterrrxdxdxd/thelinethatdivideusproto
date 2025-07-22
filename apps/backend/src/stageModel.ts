import mongoose from 'mongoose';

const stageSchema = new mongoose.Schema({
  roomId: { type: String, required: true, unique: true },
  stageState: { type: Object, required: true }
});

export const Stage = mongoose.model('Stage', stageSchema);
