import { Request, Response, NextFunction } from 'express';
import { Alias } from '../../../../models/alias';

export default () => {
  return (req: Request, res: Response, next: NextFunction) => {
    Alias.find({
      user: req.session.userId
    })
    .populate('command')
    .then(aliases => {
      res.send(aliases);
    })
    .catch(error => {
      console.error(error);
      res.sendStatus(500);
    });
  };
};
