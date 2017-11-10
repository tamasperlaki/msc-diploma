import { Request, Response, NextFunction } from 'express';
import { Command } from '../../../models/command';
import { Timer } from '../../../models/timer';
import botManager from '../../helper/botManager';
import { reject } from 'lodash';

export default () => {
  return (req: Request, res: Response, next: NextFunction) => {
    if (res.locals.command) {
      let removedCommand;

      res.locals.command.remove()
        .then(command => {
          removedCommand = command;
          Timer
            .update(
              {user: req.session.userId, commands: res.locals.command._id},
              {$pull: {commands: res.locals.command._id}},
              {multi: true}
            );
        })
        .then(() => botManager.setUserTimers(req.session.userId))
        .then(() => botManager.removeCommand(req.session.userId, removedCommand))
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
