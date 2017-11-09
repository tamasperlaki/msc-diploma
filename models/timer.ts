import * as mongoose from 'mongoose';
import { IUser } from './user';
import { ICommand } from './command';

export interface ITimer extends mongoose.Document {
  name: string;
  enabled: boolean;
  timeInMinutes: number;
  user: IUser;
  commands: ICommand[]
};

const timerSchema = new mongoose.Schema({
  name: String,
  enabled: Boolean,
  timeInMinutes: Number,
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  commands: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Command'
  }]
});

const Timer = mongoose.model<ITimer>('Timer', timerSchema);

export { Timer };
