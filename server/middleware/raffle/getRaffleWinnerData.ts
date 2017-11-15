import { Request, Response, NextFunction } from 'express';
import twitch from '../../helper/twitch';
import redis from '../../config/redis';

export default () => {
  return (req: Request, res: Response, next: NextFunction) => {
    let raffleWinner;
    twitch.getUsers([res.locals.raffleWinnerName], req.session.twitchToken)
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
  };
};
