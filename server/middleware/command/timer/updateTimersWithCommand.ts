import { Request, Response, NextFunction } from 'express';
import { map } from 'lodash';
import { Timer } from '../../../../models/timer';
import botManager from '../../../helper/botManager';

export default () => {
  return (req: Request, res: Response, next: NextFunction) => {
    Timer
      .update(
        {user: req.session.userId, commands: res.locals.command._id},
        {$pull: {commands: res.locals.command._id}},
        {multi: true}
      )
      .then(() => botManager.setUserTimers(req.session.userId))
      .then(() => res.send(res.locals.command))
      .catch(() => res.sendStatus(500));
  };
};
