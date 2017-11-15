import { Request, Response, NextFunction } from 'express';
import twitch from '../../helper/twitch';

export default () => {
  return (req: Request, res: Response, next: NextFunction) => {
    twitch.getChatters(req.session.channel)
      .then(response => {
        const viewers: string[] = response.chatters.viewers;

        if (!viewers.length) {
          res.send({});
        } else {
          const randomIndex = Math.floor(Math.random() * viewers.length);

          res.locals.raffleWinnerName = viewers[randomIndex];
          next();
        }
      })
      .catch(error => {
        console.error(error);
        res.send(500);
      });
  };
};
