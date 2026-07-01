import { Schema, model } from 'mongoose';

const workoutSchema = new Schema(
  {
    name: { type: String, required: true },
    description: { type: String, default: '' },
    difficulty: { type: String, enum: ['easy', 'medium', 'hard'], default: 'medium' },
    duration: { type: Number, required: true }, // minutes
    exercises: [
      {
        name: { type: String, required: true },
        sets: { type: Number, default: 1 },
        reps: { type: Number, default: 10 },
      },
    ],
  },
  { timestamps: true }
);

export default model('Workout', workoutSchema);
