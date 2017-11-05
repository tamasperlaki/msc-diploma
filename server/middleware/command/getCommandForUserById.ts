import { Request, Response, NextFunction } from 'express';
import { isNumber } from 'lodash';
import { Command } from '../../../models/command';

export default () => {
  return (req: Request, res: Response, next: NextFunction) => {
    Command
      .findOne({
        '_id': req.query.id,
        'user': req.session.userId
      })
      .then((command) => {
        res.locals.command = command;
        next();
      })
      .catch(error => {
        console.error(error);
        res.sendStatus(500);
      });
  };
};
