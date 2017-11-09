import { Request, Response, NextFunction } from 'express';
import { Timer } from '../../../../models/timer';
import botManager from '../../../helper/botManager';

export default () => {
  return (req: Request, res: Response, next: NextFunction) => {
    if (res.locals.timer) {
      res.locals.timer.remove()
        .then(timer => {
          //botManager.resetBot(res.locals.userId)
          return timer;
        })
        .then(timer => res.send(timer))
        .catch(error => {
          console.error(error);
          res.sendStatus(500);
        });
    } else {
      res.status(404).send('Timer was not found with the given id!');
    }
  };
};
