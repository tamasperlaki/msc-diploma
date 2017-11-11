import { Request, Response, NextFunction } from 'express';
import { Command } from '../../../models/command';

export default () => {
  return (req: Request, res: Response, next: NextFunction) => {
    Command
      .findOne({
        'name': req.body.name,
        'user': req.session.userId
      })
      .then(command => {
        res.locals.command = command;
        next();
      })
      .catch(error => {
        console.error(error);
        res.sendStatus(500);
      });
  };
};
