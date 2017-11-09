import { Request, Response, NextFunction } from 'express';
import { Command } from '../../../models/command';
import { User } from '../../../models/user';
import botManager from '../../helper/botManager';

export default () => {
  return (req: Request, res: Response, next: NextFunction) => {
    if (!res.locals.command) {
      const command = new Command();
      command.name = req.body.name;
      command.text = req.body.text;
      command.enabled = true;
      command.user = req.session.userId;

      command.save()
        .then(savedCommand => {
          res.locals.user.commands.push(command._id);
          return res.locals.user.save();
        })
        .then(user => botManager.addCommand(user._id, command))
        .then(() => res.send(command))
        .catch(error => {
          console.error(error);
          res.sendStatus(500);
        });
    } else {
      res.status(400).send('A command was already defined with this name');
    }
  };

};
