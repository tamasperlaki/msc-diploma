import { Request, Response, NextFunction } from 'express';
import { Timer } from '../../../../models/timer';

export default () => {
  return (req: Request, res: Response, next: NextFunction) => {
    Timer
      .find({
        user: req.session.userId
      })
      .populate('commands')
      .then(timers => {
        res.send(JSON.stringify(timers));
      });
  };
};
