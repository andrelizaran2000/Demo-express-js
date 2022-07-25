// Modules
import mongoose from 'mongoose';

// Env
import { MONGOOSE_KEY } from '../utils/env';

export default async function mongooseConnection () {
  try {
    await mongoose.connect(MONGOOSE_KEY);
    console.log('DB connection working');
  } catch (err:any) {
    console.log(err);
    process.exit(0);
  }
}