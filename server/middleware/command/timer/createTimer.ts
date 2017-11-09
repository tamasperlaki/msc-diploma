import { Request, Response, NextFunction } from 'express';
import { Timer } from '../../../../models/timer';
import botManager from '../../../helper/botManager';

export default () => {
  return (req: Request, res: Response, next: NextFunction) => {
    if (!res.locals.timer) {
      const timer = new Timer();
      timer.name = req.body.name;
      timer.timeInMinutes = req.body.timeInMinutes;
      timer.enabled = true;
      timer.user = req.session.userId;

      timer.save()
        //.then(user => botManager.addTimer(res.locals.userId, timer))
        .then(timer => res.send(timer))
        .catch(error => {
          console.error(error);
          res.sendStatus(500);
        });
    } else {
      res.status(400).send('A command was already defined with this name');
    }
  };

};
