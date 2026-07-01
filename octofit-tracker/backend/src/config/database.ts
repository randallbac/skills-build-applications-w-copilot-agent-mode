import mongoose from 'mongoose';

const MONGO_URI = 'mongodb://localhost:27017/octofit_db';

export async function connectDB(): Promise<void> {
  await mongoose.connect(MONGO_URI);
  console.log('Connected to MongoDB (octofit_db)');
}

export default connectDB;
