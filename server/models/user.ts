import * as mongoose from 'mongoose';

export interface IUser {
  name: string;
  display_name: string;
  email: string;
  created_at: string;
  updated_at: string;
  email_verified: boolean;
  notifications: object;
  token: string;
};

const userSchema = new mongoose.Schema({
  name: String,
  display_name: String,
  email: String,
  created_at: String,
  updated_at: String,
  email_verified: Boolean,
  notifications: Object,
  token: String
});

interface IUserModel extends IUser, mongoose.Document { }

const User = mongoose.model<IUserModel>('User', userSchema);

export default User;
