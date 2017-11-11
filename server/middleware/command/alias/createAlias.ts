import { Request, Response, NextFunction } from 'express';
import { Alias, IAlias } from '../../../../models/alias';
import botManager from '../../../helper/botManager';
import eventLogger from '../../../logger/eventLogger';

export default () => {
  return (req: Request, res: Response, next: NextFunction) => {
    if (res.locals.alias) {
      return res.status(400).send('An alias was already defined with this name');
    } else if (res.locals.command) {
      return res.status(400).send('A command was already defined with this name');
    }

    let savedAlias: IAlias;
    const alias = new Alias();
    alias.name = req.body.name;
    alias.command = req.body.command;
    alias.user = req.session.userId;
    alias.save()
      .then(response => savedAlias = response)
      .then(() => botManager.setAlias(req.session.userId, alias))
      .then(() => eventLogger.info('Added alias', {channel: req.session.channel, alias: savedAlias.name}))
      .then(() => res.send(savedAlias))
      .catch(error => {
        console.error(error);
        res.sendStatus(500);
      });
  };

};
