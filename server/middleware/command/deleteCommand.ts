import { Request, Response, NextFunction } from 'express';
import { Command } from '../../../models/command';
import botManager from '../../helper/botManager';
import { reject } from 'lodash';

export default () => {
  return (req: Request, res: Response, next: NextFunction) => {
    if (res.locals.command) {
      res.locals.command.remove()
        .then(command => {
          botManager.removeCommand(req.session.userId, command);
          return command;
        })
        .then(command => res.send(command))
        .catch(error => {
          console.error(error);
          res.sendStatus(500);
        });
    } else {
      res.status(404).send('Command was not found with the given id!');
    }
  };
};
