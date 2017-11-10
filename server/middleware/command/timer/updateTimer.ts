import { Request, Response, NextFunction } from 'express';
import { ITimer } from '../../../../models/timer';
import botManager from '../../../helper/botManager';

export default () => {
  return (req: Request, res: Response, next: NextFunction) => {
    if (res.locals.timer) {
      const paramTimer: ITimer = req.body;
      const timer = <ITimer>res.locals.timer;

      timer.enabled = paramTimer.enabled;
      timer.timeInMinutes = paramTimer.timeInMinutes;
      timer.commands = paramTimer.commands;
      timer.save()
        .then(savedTimer => {
          botManager.setTimer(req.session.userId, savedTimer);
          return savedTimer;
        })
        .then(savedTimer => res.send(savedTimer))
        .catch(error => {
          console.error(error);
          res.sendStatus(500);
        });
    } else {
      res.status(404).send('Timer was not found with the given id!');
    }
  };
};
