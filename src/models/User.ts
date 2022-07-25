// Modules
import mongoose, { Schema } from 'mongoose';

const UserSchema = new Schema ({
  userName: String,
  password: String
});

const userModel = mongoose.model('user', UserSchema);

export default userModel;