import * as mongoose from 'mongoose';
import { IUser } from './user';

export interface ICommand extends mongoose.Document {
  name: string;
  text: string;
  enabled: boolean;
  user: IUser;
};

const commandSchema = new mongoose.Schema({
  name: String,
  text: String,
  enabled: Boolean,
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
});

const Command = mongoose.model<ICommand>('Command', commandSchema);

export { Command };
