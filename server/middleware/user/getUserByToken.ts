import { Request, Response, NextFunction } from 'express';
import twitch from '../../helper/twitch';
import botManager from '../../helper/botManager';
import { User, IUser } from '../../../models/user';

export default () => {
  return (req: Request, res: Response, next: NextFunction) => {
    if (req.session.userId) {
      User
        .findById(req.session.userId, {
          name: 1,
          display_name: 1
        })
        .then(user => res.send(user));
    } else {
      twitch.getUser(req.session.twitchToken)
        .then(response => {
          return new Promise((resolve, reject) => {
            User.findOne({
              name: response.name
            }).then(user => {
              if (user) {
                resolve(user);
              } else {
                const newUser = new User();
                newUser.token = req.session.twitchToken;
                newUser.name = response.name;
                newUser.display_name = response.display_name;
                newUser.email = response.email;
                newUser.created_at = response.created_at;
                newUser.updated_at = response.updated_at;
                newUser.email_verified = response.email_verified;
                newUser.notifications = response.notifications;

                resolve(newUser.save());
              }
            });
          });
        })
        .then((user: IUser) => {
          req.session.userId = user._id;
          req.session.channel = user.name;
          return user;
        })
        .then((user: IUser) => {
          botManager.createBot(user);
          res.send(user);
        })
        .catch(errorCode => {
          if (errorCode === 401) {
            res.sendStatus(404);
          } else {
            res.sendStatus(500);
          }
        });
    }
  };
};
