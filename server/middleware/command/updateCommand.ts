import { Request, Response, NextFunction } from 'express';
import { ICommand } from '../../../models/command';
import botManager from '../../helper/botManager';
import eventLogger from '../../helper/eventLogger';

export default () => {
  return (req: Request, res: Response, next: NextFunction) => {
    if (res.locals.command) {
      let updatedCommand: ICommand;
      const paramCommand: ICommand = req.body;
      const storedCommand: ICommand = res.locals.command;

      storedCommand.enabled = paramCommand.enabled;
      storedCommand.text = paramCommand.text;
      storedCommand.save()
        .then(command => updatedCommand = command)
        .then(() => botManager.setUserTimers(req.session.userId))
        .then(() => botManager.setUserAliases(req.session.userId))
        .then(() => botManager.setCommand(req.session.userId, updatedCommand))
        .then(() => eventLogger.info('Updated command', {channel: req.session.channel, userId: req.session.userId, command: updatedCommand.name}))
        .then(() => res.send(updatedCommand))
        .catch(error => {
          console.error(error);
          res.sendStatus(500);
        });
    } else {
      res.status(404).send('Command was not found with the given id!');
    }
  };
};
