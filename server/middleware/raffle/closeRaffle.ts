import { Request, Response, NextFunction } from 'express';
import redis from '../../config/redis';
import eventLogger from '../../helper/eventLogger';
import botManager from '../../helper/botManager';

export default () => {
  return (req: Request, res: Response, next: NextFunction) => {
    redis.srem('raffles', `${req.session.userId}`, (removeRaffleError, removeRaffleReply) => {
      if (removeRaffleError) {
        console.error(removeRaffleError);
        res.sendStatus(500);
      } else if (removeRaffleReply !== 1) {
        console.error(`Raffle was already closed! (reply: ${removeRaffleReply})`);
        res.status(500).send(`Raffle was already closed!`);
      }

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

          botManager.closeRaffle(req.session.userId);
          eventLogger.info('Closed Raffle', {channel: req.session.channel, userId: req.session.userId});
          res.sendStatus(200);
        });
      });
    });
  };
};
