import { Request, Response, NextFunction } from 'express';
import redis from '../../config/redis';

export default () => {
  return (req: Request, res: Response, next: NextFunction) => {
    redis.sismember('raffles', `${req.session.userId}`, (error, reply) => {
      if (error) {
        console.error(error);
        res.sendStatus(500);
      }

      if (reply === 1) {
        res.send(true);
      } else {
        res.send(false);
      }
    });
  };
};
