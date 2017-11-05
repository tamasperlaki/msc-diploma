import { Request, Response, NextFunction } from 'express';
import { ICommand } from '../../../models/command';
import botManager from '../../helper/botManager';

export default () => {
  return (req: Request, res: Response, next: NextFunction) => {
    if (res.locals.command) {
      let paramCommand = req.body;
      let storedCommand = <ICommand>res.locals.command;

      storedCommand.enabled = paramCommand.enabled;
      storedCommand.text = paramCommand.text;
      storedCommand.save()
        .then(savedCommand => {
          botManager.resetBot(res.locals.user);
          return savedCommand;
        })
        .then(savedCommand => res.send(savedCommand))
        .catch(error => {
          console.error(error);
          res.sendStatus(500);
        });
    } else {
      res.status(404).send('Command was not found with the given id!');
    }
  };
};
