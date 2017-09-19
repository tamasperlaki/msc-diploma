import * as mongoose from 'mongoose';

mongoose.connect(process.env.MONGODB, {
  useMongoClient: true
});

(<any>mongoose).Promise = global.Promise;
mongoose.connection.on('error', console.error.bind(console, 'connection error:'));
mongoose.connection.once('open', () => {
  console.log('MongoDB connected');
});

export default mongoose;
