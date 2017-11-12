import { Request, Response, NextFunction } from 'express';
import { Event } from '../../../models/event';

export default () => {
  return (req: Request, res: Response, next: NextFunction) => {
    Event
      .find({
        "meta.channel": req.session.channel
      })
      .then(events => res.send(events))
      .catch(error => {
        console.error(error);
        res.sendStatus(500);
      });
  };
};
