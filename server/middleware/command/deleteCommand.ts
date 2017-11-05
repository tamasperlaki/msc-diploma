import { Request, Response, NextFunction } from 'express';
import { Command } from '../../../models/command';
import botManager from '../../helper/botManager';

export default () => {
  return (req: Request, res: Response, next: NextFunction) => {
    if (res.locals.command) {
      res.locals.command.remove()
        .then(command => res.send(command))
        .then(savedCommand => {
          res.locals.user.commands = res.locals.user.commands.filter(c => c._id.equals(savedCommand._id));
          return res.locals.user.save();
        })
        .then(user => botManager.resetBot(user))
        .catch(error => {
          console.error(error);
          res.sendStatus(500);
        });
    } else {
      res.status(404).send('Command was not found with the given id!');
    }
  };
};