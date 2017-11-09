import { Request, Response, NextFunction } from 'express';
import { Timer } from '../../../../models/timer';

export default () => {
  return (req: Request, res: Response, next: NextFunction) => {
    Timer
      .findOne({
        '_id': req.params.id,
        'user': req.session.userId
      })
      .then(timer => {
        res.locals.timer = timer;
        next();
      })
      .catch(() => res.sendStatus(500));
  };
};
