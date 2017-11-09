import { Request, Response, NextFunction } from 'express';
import { ITimer } from '../../../../models/timer';
import botManager from '../../../helper/botManager';

export default () => {
  return (req: Request, res: Response, next: NextFunction) => {
    if (res.locals.timer) {
      const paramTimer : ITimer = req.body;
      const storedTimer = <ITimer>res.locals.timer;

      storedTimer.enabled = paramTimer.enabled;
      storedTimer.save()
        .then(savedTimer => {
          //botManager.resetBot(res.locals.user._id);
          return savedTimer;
        })
        .then(savedCommand => res.send(savedCommand))
        .catch(error => {
          console.error(error);
          res.sendStatus(500);
        });
    } else {
      res.status(404).send('Timer was not found with the given id!');
    }
  };
};
