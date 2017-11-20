import { Request, Response, NextFunction } from 'express';
import { chain } from 'lodash';
import redis from '../../config/redis';
import botManager from '../../helper/botManager';
import eventLogger from '../../helper/eventLogger';
import {  } from 'redis';

export default () => {
  return (req: Request, res: Response, next: NextFunction) => {
    redis.zrange(`poll:${req.session.userId}`, 0, -1, 'WITHSCORES', (error, reply) => {
      if (error) {
        return next(error);
      }

      res.locals.pollResults = reply;
      return next();
    });
  };
};
