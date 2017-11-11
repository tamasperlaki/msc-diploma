import { Request, Response, NextFunction } from 'express';
import { ICommand } from '../../../models/command';
import botManager from '../../helper/botManager';

export default () => {
  return (req: Request, res: Response, next: NextFunction) => {
    if (res.locals.command) {
      const paramCommand: ICommand = req.body;
      const storedCommand: ICommand = res.locals.command;
      let savedCommand: ICommand;

      storedCommand.enabled = paramCommand.enabled;
      storedCommand.text = paramCommand.text;
      storedCommand.save()
        .then(command => savedCommand = command)
        .then(() => botManager.setUserTimers(req.session.userId))
        .then(() => botManager.setUserAliases(req.session.userId))
        .then(() => botManager.setCommand(req.session.userId, savedCommand))
        .then(() => res.send(savedCommand))
        .catch(error => {
          console.error(error);
          res.sendStatus(500);
        });
    } else {
      res.status(404).send('Command was not found with the given id!');
    }
  };
};
