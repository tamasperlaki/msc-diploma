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
      Promise.all([
        twitch.getUser(req.session.twitchToken),
        twitch.getChannel(req.session.twitchToken)
      ])
        .then(responses => {
          const getUserResponse = responses[0];
          const getChannelResponse = responses[1];

          req.session.channelId = getChannelResponse._id;
          return new Promise((resolve, reject) => {
            User.findOne({
              name: getUserResponse.name
            }).then(user => {
              if (user) {
                resolve(user);
              } else {
                const newUser = new User();
                newUser.token = req.session.twitchToken;
                newUser.name = getUserResponse.name;
                newUser.display_name = getUserResponse.display_name;
                newUser.email = getUserResponse.email;
                newUser.created_at = getUserResponse.created_at;
                newUser.updated_at = getUserResponse.updated_at;
                newUser.email_verified = getUserResponse.email_verified;
                newUser.notifications = getUserResponse.notifications;

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
