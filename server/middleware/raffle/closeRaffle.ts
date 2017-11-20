import { Request, Response, NextFunction } from 'express';
import redis from '../../config/redis';
import eventLogger from '../../helper/eventLogger';
import botManager from '../../helper/botManager';

export default () => {
  return (req: Request, res: Response, next: NextFunction) => {
    redis.srem('raffles', `${req.session.userId}`, (removeRaffleError, removeRaffleReply) => {
      if (removeRaffleError) {
        console.error(removeRaffleError);
        return res.sendStatus(500);
      } else if (removeRaffleReply !== 1) {
        console.error(`Raffle was already closed! (reply: ${removeRaffleReply})`);
        return res.status(500).send(`Raffle was already closed!`);
      }

      redis.del(`rafflers:${req.session.userId}`, (delRafflersError, delRafflersReply) => {
        if (delRafflersError) {
          console.error(delRafflersError);
          return res.sendStatus(500);
        }

        botManager.closeRaffle(req.session.userId);
        eventLogger.info('Closed Raffle', {channel: req.session.channel, userId: req.session.userId});
        return res.sendStatus(200);
      });
    });
  };
};
