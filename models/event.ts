import * as mongoose from 'mongoose';

export interface IEvent extends mongoose.Document {
  timestamp: Date;
  level: string;
  message: string;
  meta: object;
};

const eventSchema = new mongoose.Schema({
  timestamp: Date,
  level: String,
  message: String,
  meta: Object
});

const Event = mongoose.model<IEvent>('Event', eventSchema);

export { Event };
