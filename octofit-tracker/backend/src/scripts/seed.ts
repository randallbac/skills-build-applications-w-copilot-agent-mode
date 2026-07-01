/**
 * Seed the octofit_db database with test data.
 *
 * Run with:
 *   npx ts-node src/scripts/seed.ts
 */

import connectDB from '../database';
import mongoose from 'mongoose';
import User from '../models/User';
import Team from '../models/Team';
import Activity from '../models/Activity';
import LeaderboardEntry from '../models/LeaderboardEntry';
import Workout from '../models/Workout';

async function seed() {
  await connectDB();

  // Clear existing data
  await Promise.all([
    User.deleteMany({}),
    Team.deleteMany({}),
    Activity.deleteMany({}),
    LeaderboardEntry.deleteMany({}),
    Workout.deleteMany({}),
  ]);
  console.log('Cleared existing collections');

  // --- Users ---
  const users = await User.insertMany([
    { username: 'mona_octocat', email: 'mona@octofit.dev', password: 'hashed_pw_1', fitness_level: 'advanced' },
    { username: 'hubot_runner', email: 'hubot@octofit.dev', password: 'hashed_pw_2', fitness_level: 'intermediate' },
    { username: 'codercat42', email: 'coder@octofit.dev', password: 'hashed_pw_3', fitness_level: 'beginner' },
    { username: 'devops_dana', email: 'dana@octofit.dev', password: 'hashed_pw_4', fitness_level: 'intermediate' },
    { username: 'sprint_sam', email: 'sam@octofit.dev', password: 'hashed_pw_5', fitness_level: 'advanced' },
  ]);
  console.log(`Inserted ${users.length} users`);

  // --- Teams ---
  const teams = await Team.insertMany([
    {
      name: 'Octo Runners',
      description: 'A team of dedicated runners pushing their limits every day.',
      members: [users[0]._id, users[1]._id, users[4]._id],
    },
    {
      name: 'Code & Cardio',
      description: 'Developers who balance sprints in code with sprints on the track.',
      members: [users[1]._id, users[2]._id, users[3]._id],
    },
    {
      name: 'DevOps Lifters',
      description: 'Infrastructure engineers who lift heavy in the gym and in production.',
      members: [users[3]._id, users[4]._id],
    },
  ]);
  console.log(`Inserted ${teams.length} teams`);

  // --- Activities ---
  const activities = await Activity.insertMany([
    { user: users[0]._id, type: 'Running', duration: 45, calories: 480, date: new Date('2026-06-28') },
    { user: users[0]._id, type: 'Cycling', duration: 60, calories: 600, date: new Date('2026-06-30') },
    { user: users[1]._id, type: 'Swimming', duration: 30, calories: 320, date: new Date('2026-06-29') },
    { user: users[1]._id, type: 'Running', duration: 50, calories: 530, date: new Date('2026-07-01') },
    { user: users[2]._id, type: 'Yoga', duration: 40, calories: 150, date: new Date('2026-06-27') },
    { user: users[3]._id, type: 'Weightlifting', duration: 55, calories: 420, date: new Date('2026-06-30') },
    { user: users[4]._id, type: 'Running', duration: 35, calories: 370, date: new Date('2026-07-01') },
    { user: users[4]._id, type: 'HIIT', duration: 25, calories: 310, date: new Date('2026-06-29') },
  ]);
  console.log(`Inserted ${activities.length} activities`);

  // --- Workouts ---
  const workouts = await Workout.insertMany([
    {
      name: 'Morning Cardio Blast',
      description: 'A high-energy morning routine to kickstart your day.',
      difficulty: 'medium',
      duration: 30,
      exercises: [
        { name: 'Jumping Jacks', sets: 3, reps: 30 },
        { name: 'High Knees', sets: 3, reps: 20 },
        { name: 'Burpees', sets: 3, reps: 10 },
      ],
    },
    {
      name: 'Strength Foundation',
      description: 'Core compound movements to build overall strength.',
      difficulty: 'hard',
      duration: 50,
      exercises: [
        { name: 'Squat', sets: 4, reps: 8 },
        { name: 'Deadlift', sets: 4, reps: 6 },
        { name: 'Bench Press', sets: 4, reps: 8 },
        { name: 'Pull-Up', sets: 3, reps: 6 },
      ],
    },
    {
      name: 'Beginner Yoga Flow',
      description: 'Gentle stretches and poses for flexibility and mindfulness.',
      difficulty: 'easy',
      duration: 25,
      exercises: [
        { name: 'Cat-Cow Stretch', sets: 2, reps: 10 },
        { name: 'Downward Dog', sets: 3, reps: 5 },
        { name: "Child's Pose", sets: 2, reps: 1 },
      ],
    },
    {
      name: 'HIIT Inferno',
      description: 'Short intense intervals to maximise calorie burn.',
      difficulty: 'hard',
      duration: 20,
      exercises: [
        { name: 'Sprint Intervals', sets: 6, reps: 1 },
        { name: 'Box Jumps', sets: 4, reps: 10 },
        { name: 'Mountain Climbers', sets: 4, reps: 20 },
      ],
    },
  ]);
  console.log(`Inserted ${workouts.length} workouts`);

  // --- Leaderboard ---
  const leaderboardEntries = await LeaderboardEntry.insertMany([
    { user: users[4]._id, score: 1850 },
    { user: users[0]._id, score: 1720 },
    { user: users[1]._id, score: 1540 },
    { user: users[3]._id, score: 1390 },
    { user: users[2]._id, score: 920 },
  ]);
  console.log(`Inserted ${leaderboardEntries.length} leaderboard entries`);

  console.log('\nSeed complete ✅');
  await mongoose.disconnect();
}

seed().catch((err) => {
  console.error('Seed failed:', err);
  process.exit(1);
});
