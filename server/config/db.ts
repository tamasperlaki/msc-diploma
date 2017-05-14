import * as mongoose from 'mongoose';

mongoose.connect('mongodb://localhost/lwjw7e-diploma');

mongoose.Promise = global.Promise;
mongoose.connection.on('error', console.error.bind(console, 'connection error:'));
mongoose.connection.once('open', () => {
  console.log('MongoDB connected');
});

export default mongoose;
