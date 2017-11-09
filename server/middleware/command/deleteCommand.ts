import { Request, Response, NextFunction } from 'express';
import { Command } from '../../../models/command';
import botManager from '../../helper/botManager';
import { reject } from 'lodash';

export default () => {
  return (req: Request, res: Response, next: NextFunction) => {
    if (res.locals.command) {
      let command;

      res.locals.command.remove()
        .then(removedCommand => {
          command = removedCommand;
          res.locals.user.commands = reject(res.locals.user.commands, c => c.equals(removedCommand._id));
          return res.locals.user.save();
        })
        .then(user => botManager.resetBot(user._id))
        .then(() => res.send(command))
        .catch(error => {
          console.error(error);
          res.sendStatus(500);
        });
    } else {
      res.status(404).send('Command was not found with the given id!');
    }
  };
};
