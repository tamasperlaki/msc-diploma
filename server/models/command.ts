import * as mongoose from 'mongoose';
import { IUser } from './user';

export interface ICommand {
  name: string;
  text: string;
  enabled: boolean;
  user: IUser
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

interface ICommandModel extends ICommand, mongoose.Document { }

const Command = mongoose.model<ICommandModel>('Command', commandSchema);

export default Command;
