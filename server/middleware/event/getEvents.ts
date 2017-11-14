import { Request, Response, NextFunction } from 'express';
import { Event } from '../../../models/event';
import { sortBy } from 'lodash';

export default () => {
  return (req: Request, res: Response, next: NextFunction) => {
    Event
      .find({
        'meta.channel': req.session.channel
      })
      .sort('-timestamp')
      .limit(50)
      .then(events => sortBy(events, 'timestamp'))
      .then(events => res.send(events))
      .catch(error => {
        console.error(error);
        res.sendStatus(500);
      });
  };
};
