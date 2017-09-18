import * as mongoose from 'mongoose';
import { ICommand } from './command';

export interface IUser extends mongoose.Document {
  name: string;
  display_name: string;
  email: string;
  created_at: string;
  updated_at: string;
  email_verified: boolean;
  notifications: object;
  token: string;
  commands: ICommand[];
};

const userSchema = new mongoose.Schema({
  name: String,
  display_name: String,
  email: String,
  created_at: String,
  updated_at: String,
  email_verified: Boolean,
  notifications: Object,
  token: String,
  commands: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Command'
  }]
});

const User = mongoose.model<IUser>('User', userSchema);

export { User } ;
