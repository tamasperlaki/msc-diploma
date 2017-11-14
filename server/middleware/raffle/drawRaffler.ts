import { Request, Response, NextFunction } from 'express';
import twitch from '../../helper/twitch';
import redis from '../../config/redis';

export default () => {
  return (req: Request, res: Response, next: NextFunction) => {
    redis.sismember('raffles', `${req.session.userId}`, (isMemberError, isMemberReply) => {
      if (isMemberError) {
        console.error(isMemberError);
        res.sendStatus(500);
      } else if (isMemberReply !== 1) {
        console.error(`Raffle is not open! (reply: ${isMemberReply})`);
        res.status(400).send(`Raffle is not open!`);
      }

      redis.spop(`rafflers:${req.session.userId}`, (popRafflerError, popRafflerReply) => {
        if (popRafflerError) {
          console.error(popRafflerError);
          res.sendStatus(500);
        }

        if(!popRafflerReply) {
          return res.send(popRafflerReply);
        }

        //twitch.callTwitchApi
      });
    });
  };
};
