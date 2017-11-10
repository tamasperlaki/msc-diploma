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
          botManager.setCommand(req.session.userId, command);
          return savedCommand;
        })
        .then(savedCommand => res.send(savedCommand))
        .catch(error => {
          console.error(error);
          res.sendStatus(500);
        });
    } else {
      res.status(400).send('A command was already defined with this name');
    }
  };

};
