import { Request, Response, NextFunction } from 'express';
import { Timer } from '../../../../models/timer';

export default () => {
  return (req: Request, res: Response, next: NextFunction) => {
    if (!res.locals.timer) {
      const timer = new Timer();
      timer.name = req.body.name;
      timer.timeInMinutes = req.body.time;
      timer.enabled = true;
      timer.user = req.session.userId;

      timer.save()
        .then(savedTimer => res.send(savedTimer))
        .catch(error => {
          console.error(error);
          res.sendStatus(500);
        });
    } else {
      res.status(400).send('A timer was already defined with this name');
    }
  };

};
