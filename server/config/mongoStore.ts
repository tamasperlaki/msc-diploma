import * as session from 'express-session';
import * as connectMongo from 'connect-mongo';
import mongoose from './db';

const MongoStore = connectMongo(session);

const mongoStore = new MongoStore({ mongooseConnection: mongoose.connection });

export default mongoStore;
