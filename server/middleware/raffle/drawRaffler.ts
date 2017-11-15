import { Request, Response, NextFunction } from 'express';
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

      redis.spop(`rafflers:${req.session.userId}`, (popRafflerError, raffleWinnerName) => {
        if (popRafflerError) {
          console.error(popRafflerError);
          return res.sendStatus(500);
        }

        if (!raffleWinnerName) {
          return res.send({});
        }

        res.locals.raffleWinnerName = raffleWinnerName;
        next();
      });
    });
  };
};
