import { Request, Response, NextFunction } from 'express';
import { Command } from '../../models/command';

export default () => {
  return (req: Request, res: Response, next: NextFunction) => {
    if (res.locals.command) {
      res.locals.command.remove()
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
