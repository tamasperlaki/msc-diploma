import { Request, Response, NextFunction } from 'express';
import { ITimer } from '../../../../models/timer';
import botManager from '../../../helper/botManager';
import eventLogger from '../../../helper/eventLogger';

export default () => {
  return (req: Request, res: Response, next: NextFunction) => {
    if (res.locals.timer) {
      let savedTimer: ITimer;
      const paramTimer: ITimer = req.body;
      const storedTimer: ITimer = res.locals.timer;

      storedTimer.enabled = paramTimer.enabled;
      storedTimer.timeInMinutes = paramTimer.timeInMinutes;
      storedTimer.commands = paramTimer.commands;
      storedTimer.save()
        .then(timer => savedTimer = timer)
        .then(() => botManager.setTimer(req.session.userId, savedTimer))
        .then(() => eventLogger.info('Updated timer', {channel: req.session.channel, userId: req.session.userId, timer: savedTimer.name}))
        .then(() => res.send(savedTimer))
        .catch(error => {
          console.error(error);
          res.sendStatus(500);
        });
    } else {
      res.status(404).send('Timer was not found with the given id!');
    }
  };
};
