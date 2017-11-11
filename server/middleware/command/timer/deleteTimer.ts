import { Request, Response, NextFunction } from 'express';
import { Timer, ITimer } from '../../../../models/timer';
import botManager from '../../../helper/botManager';
import eventLogger from '../../../logger/eventLogger';

export default () => {
  return (req: Request, res: Response, next: NextFunction) => {
    if (res.locals.timer) {
      let removedTimer: ITimer;

      res.locals.timer.remove()
        .then(timer => removedTimer = timer)
        .then(() => botManager.removeTimer(req.session.userId, removedTimer))
        .then(() => eventLogger.info('Removed timer', {channel: req.session.channel, timer: name}))
        .then(() => res.send(removedTimer))
        .catch(error => {
          console.error(error);
          res.sendStatus(500);
        });
    } else {
      res.status(404).send('Timer was not found with the given id!');
    }
  };
};
