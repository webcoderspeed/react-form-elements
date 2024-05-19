import mongoose from 'mongoose';
import { MONGO_URL } from '../constants';

export const connectDB = async () => {
  try {
    const conn = await mongoose.connect(MONGO_URL, {
      maxPoolSize: 10,
    });

    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error: any) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

