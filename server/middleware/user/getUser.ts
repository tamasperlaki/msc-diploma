import { Request, Response, NextFunction } from 'express';
import twitch from "../../helper/twitch";

export default () => {
  return (req: Request, res: Response, next: NextFunction) => {
    console.log(req.session);
    twitch.getUser(req.session.twitchToken)
      .then((response) => {
        response.token = req.session.twitchToken;
        res.send(JSON.stringify(response));
      })
      .catch((errorCode) => {
        if(errorCode === 401) {
          res.sendStatus(404);
        } else {
          res.sendStatus(500);
        }
      });
  }
};
