import mongoose from 'mongoose';
import User from '../models/User';
import Trip from '../models/Trip';

/**
 * Automatically creates and verifies database collections as defined in the models.
 * Ensures indexes (such as unique email on users) are properly built.
 */
export const initDatabaseCollections = async (): Promise<void> => {
  try {
    const db = mongoose.connection.db;
    if (!db) return;

    // Retrieve currently existing collection names in the connected database
    const existingCollections = await db.listCollections().toArray();
    const existingNames = existingCollections.map((col) => col.name);

    // Schema collections defined in code:
    // - User -> 'users'
    // - Trip -> 'trip'
    const modelsToSync = [
      { name: 'users', model: User },
      { name: 'trip', model: Trip },
    ];

    for (const item of modelsToSync) {
      if (!existingNames.includes(item.name)) {
        await db.createCollection(item.name);
        console.log(`[Database Init] Created collection: '${item.name}'`);
      }
      // Ensure model indexes (like unique email) are initialized
      await item.model.init();
    }

    console.log(
      `[Database Init] Database '${mongoose.connection.name}' ready with collections: [users, trip]`
    );
  } catch (error: any) {
    console.warn(`[Database Init Warning] Collection verification notice: ${error.message}`);
  }
};

/**
 * Connect to MongoDB and initialize collections
 */
const connectDB = async (): Promise<void> => {
  try {
    let mongoURI = process.env.MONGODB_URI;

    if (!mongoURI) {
      // In development mode, provide safe fallback to local MongoDB instance
      if (process.env.NODE_ENV !== 'production') {
        mongoURI = 'mongodb://127.0.0.1:27017/car_expenses';
        console.warn(
          `[Database Notice] MONGODB_URI not set. Using local development fallback: ${mongoURI}`
        );
      } else {
        throw new Error('MONGODB_URI is not defined in environment variables for production.');
      }
    }

    const conn = await mongoose.connect(mongoURI);
    console.log(`MongoDB Connected: ${conn.connection.host}`);

    // Automatically ensure database and collections exist as per application code
    await initDatabaseCollections();
  } catch (error: any) {
    console.error(`Error connecting to MongoDB: ${error.message}`);
    process.exit(1);
  }
};

export default connectDB;
