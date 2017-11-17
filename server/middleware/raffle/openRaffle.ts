import { Request, Response, NextFunction } from 'express';
import redis from '../../config/redis';
import botManager from '../../helper/botManager';
import eventLogger from '../../helper/eventLogger';

export default () => {
  return (req: Request, res: Response, next: NextFunction) => {
    redis.sadd('raffles', `${req.session.userId}`, (error, reply) => {
      if (error) {
        console.error(error);
        res.sendStatus(500);
      } else if (reply !== 1) {
        console.error(`Raffle was already opened! (reply: ${reply})`);
        res.status(500).send(`Raffle was already opened`);
      }

      botManager.openRaffle(req.session.userId, true);
      eventLogger.info('Opened Raffle', {channel: req.session.channel, userId: req.session.userId});
      res.sendStatus(200);
    });
  };
};
