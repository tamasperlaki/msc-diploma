import { Request, Response, NextFunction } from 'express';
import { IAlias } from '../../../../models/alias';
import botManager from '../../../helper/botManager';
import eventLogger from '../../../helper/eventLogger';

export default () => {
  return (req: Request, res: Response, next: NextFunction) => {
    if (res.locals.alias) {
      let removedAlias: IAlias;

      res.locals.alias.remove()
        .then(alias => removedAlias = alias)
        .then(() => botManager.removeAlias(req.session.userId, removedAlias))
        .then(() => eventLogger.info('Removed alias', {channel: req.session.channel, userId: req.session.userId, alias: removedAlias.name}))
        .then(() => res.send(removedAlias))
        .catch(error => {
          console.error(error);
          res.sendStatus(500);
        });
    } else {
      res.status(404).send('Timer was not found with the given id!');
    }
  };
};
