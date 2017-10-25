import { Request, Response, NextFunction } from 'express';
import twitch from '../../helper/twitch';

export default () => {
  return (req: Request, res: Response, next: NextFunction) => {
    twitch.getToken(req.query.code)
      .then((token) => {
        req.session['twitchToken'] = token.access_token;
        res.redirect('/');
      })
      .catch((error) => {
        console.error(error);
        res.redirect('/welcome');
      });
  };
};
