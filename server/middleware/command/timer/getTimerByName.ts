import { Request, Response, NextFunction } from 'express';
import { Timer } from '../../../../models/timer';

export default () => {
  return (req: Request, res: Response, next: NextFunction) => {
    Timer
      .findOne({
        'user': req.session.userId,
        'name': req.body.name
      })
      .then(timer => {
        res.locals.timer = timer;
        next();
      })
      .catch(error => {
        console.error(error);
        res.sendStatus(500);
      });
  };
};
