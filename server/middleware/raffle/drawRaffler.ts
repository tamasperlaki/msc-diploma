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

      redis.spop(`rafflers:${req.session.userId}`, (popRafflerError, raffleWinnerName) => {
        if (popRafflerError) {
          console.error(popRafflerError);
          return res.sendStatus(500);
        }

        if (!raffleWinnerName) {
          return res.send({});
        }

        let raffleWinner;
        twitch.getUsers([raffleWinnerName], req.session.twitchToken)
          .then(getUsersResponse => {
            raffleWinner = getUsersResponse.users.shift();
            return twitch.checkUserFollowsChannel(raffleWinner._id, req.session.channelId);
          })
          .then(
            checkUserFollowsChannelResponse => raffleWinner.following = true,
            checkUserFollowsChannelResponseStatus => {
              if (checkUserFollowsChannelResponseStatus === 404) {
                raffleWinner.following = false;
              } else {
                console.error(`checkUserFollowsChannel failed with status: ${checkUserFollowsChannelResponseStatus}`);
                res.sendStatus(500);
              }
            })
          .then(() => res.send(raffleWinner))
          .catch(error => {
            console.error(error);
            res.sendStatus(500);
          });
      });
    });
  };
};
