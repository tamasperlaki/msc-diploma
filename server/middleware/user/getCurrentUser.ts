import { Request, Response, NextFunction } from 'express';
import { User } from '../../../models/user';

export default () => {
  return (req: Request, res: Response, next: NextFunction) => {
    User.findById(req.session.userId)
      .then(user => {
        res.locals.user = user;
        next();
      })
      .catch(error => {
        console.error(error);
        res.sendStatus(500);
      });
  };

};
