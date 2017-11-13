import { io, getSocketIdByUserId } from '../config/socket';
import { IEvent } from '../../models/event';
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
          collection: 'events'
      })
  ],
  rewriters: [
    function(level, msg, meta) {
      if (meta.userId) {
        const userId = meta.userId;

        delete meta.userId;
        io.clients((error, clients) => {
          const socket = io.sockets.connected[getSocketIdByUserId(userId)];

          if(socket) {
            const event = <IEvent>{
              timestamp: new Date(),
              level: level,
              message: msg,
              meta: meta
            };

            socket.emit('event', event);
          }
        });
      } else {
        throw new Error('userId should be present in the eventLogger meta');
      }

      return meta;
    }
  ]
});

export default eventLogger;
