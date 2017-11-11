import * as mongoose from 'mongoose';
import { IUser } from './user';
import { ICommand } from './command';

export interface IAlias extends mongoose.Document {
  name: string;
  user: IUser;
  command: ICommand;
};

const aliasSchema = new mongoose.Schema({
  name: String,
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  command: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Command'
  }
});

const Alias = mongoose.model<IAlias>('Alias', aliasSchema);

export { Alias };
