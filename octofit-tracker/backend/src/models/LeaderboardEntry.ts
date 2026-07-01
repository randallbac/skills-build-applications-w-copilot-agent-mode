import { Schema, model, Types } from 'mongoose';

const leaderboardEntrySchema = new Schema(
  {
    user: { type: Types.ObjectId, ref: 'User', required: true },
    score: { type: Number, required: true, default: 0 },
    rank: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export default model('LeaderboardEntry', leaderboardEntrySchema);
