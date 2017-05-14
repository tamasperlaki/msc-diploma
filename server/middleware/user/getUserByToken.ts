import { Request, Response, NextFunction } from 'express';
import twitch from "../../helper/twitch";
import User from "../../models/user";

export default () => {
  return (req: Request, res: Response, next: NextFunction) => {
    if(req.session.user) {
      res.send(JSON.stringify(req.session.user));
    } else {
      twitch.getUser(req.session.twitchToken)
        .then((response) => {
          return new Promise((resolve, reject) => {
            User.findOne({
              email: response.email
            }).then((user) => {
              if(user) {
                resolve(user);
              } else {
                var user = new User();
                user.token = req.session.twitchToken;
                user.name = response.name;
                user.display_name = response.display_name;
                user.email = response.email;
                user.created_at = response.created_at;
                user.updated_at = response.updated_at;
                user.email_verified = response.email_verified;
                user.notifications = response.notifications;

                resolve(user.save());
              }
            });
          });
        })
        .then((user) => {
          req.session.user = user;
          res.send(JSON.stringify(user))
        })
        .catch((errorCode) => {
          if(errorCode === 401) {
            res.sendStatus(404);
          } else {
            res.sendStatus(500);
          }
        });
      }
    }
};
