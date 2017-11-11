const winston = require('winston');
require('winston-mongodb');

const eventLogger = new (winston.Logger)({
  transports: [
      new (winston.transports.Console)({
          level: 'debug',
          timestamp: true,
          colorize: true
      }),
      new (winston.transports.MongoDB)({
          db: process.env.MONGODB,
          collection: 'event'
      })
  ]
});

export default eventLogger;
