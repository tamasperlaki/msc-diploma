import { Request, Response, NextFunction } from 'express';
import { Command, ICommand } from '../../../models/command';
import { Timer } from '../../../models/timer';
import { Alias } from '../../../models/alias';
import botManager from '../../helper/botManager';
import eventLogger from '../../logger/eventLogger';
import { reject } from 'lodash';

export default () => {
  return (req: Request, res: Response, next: NextFunction) => {
    if (res.locals.command) {
      let removedCommand: ICommand;

      res.locals.command.remove()
        .then(command => removedCommand = command)
        .then(() =>
          Timer.update(
            {user: req.session.userId, commands: removedCommand._id},
            {$pull: {commands: removedCommand._id}},
            {multi: true}
          )
        )
        .then(() => Alias.remove({user: req.session.userId, command: removedCommand._id}))
        .then(() => botManager.setUserTimers(req.session.userId))
        .then(() => botManager.setUserAliases(req.session.userId))
        .then(() => botManager.removeCommand(req.session.userId, removedCommand))
        .then(() => eventLogger.info('Removed command', {channel: req.session.channel, command: removedCommand.name}))
        .then(() => res.send(removedCommand))
        .catch(error => {
          console.error(error);
          res.sendStatus(500);
        });
    } else {
      res.status(404).send('Command was not found with the given id!');
    }
  };
};
