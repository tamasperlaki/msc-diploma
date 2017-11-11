import { Request, Response, NextFunction } from 'express';
import { Alias } from '../../../../models/alias';
import botManager from '../../../helper/botManager';

export default () => {
  return (req: Request, res: Response, next: NextFunction) => {
    if(res.locals.alias) {
      return res.status(400).send('An alias was already defined with this name');
    } else if(res.locals.command) {
      return res.status(400).send('A command was already defined with this name');
    }

    const alias = new Alias();
    alias.name = req.body.name;
    alias.command = req.body.command;
    alias.user = req.session.userId;

    alias.save()
      .then(savedAlias => {
        botManager.setAlias(req.session.userId, alias);
        return savedAlias;
      })
      .then(savedAlias => res.send(savedAlias))
      .catch(error => {
        console.error(error);
        res.sendStatus(500);
      });
  };

};
