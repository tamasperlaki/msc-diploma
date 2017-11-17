import { Request, Response, NextFunction } from 'express';
import redis from '../../config/redis';

export default () => {
  return (req: Request, res: Response, next: NextFunction) => {
    redis.sismember('polls', `${req.session.userId}`, (error, reply) => {
      if (error) {
        return next(error);
      }

      if (reply === 1) {
        return res.send(true);
      } else {
        return res.send(false);
      }
    });
  };
};
