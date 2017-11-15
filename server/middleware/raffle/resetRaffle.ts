import { Request, Response, NextFunction } from 'express';
import redis from '../../config/redis';
import eventLogger from '../../helper/eventLogger';

export default () => {
  return (req: Request, res: Response, next: NextFunction) => {
    const raffleKey = `rafflers:${req.session.userId}`;
    redis.scard(raffleKey, (countRafflersError, countRafflersReply) => {
      if (countRafflersError) {
        console.error(countRafflersError);
        res.sendStatus(500);
      }

      redis.spop(raffleKey, countRafflersReply, (popRafflersError, popRafflersReply) => {
        if (popRafflersError) {
          console.error(popRafflersError);
          res.sendStatus(500);
        }

        eventLogger.info('Reset Raffle', {channel: req.session.channel, userId: req.session.userId});
        res.sendStatus(200);
      });
    });
  };
};
