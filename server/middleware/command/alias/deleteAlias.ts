import { Request, Response, NextFunction } from 'express';
import botManager from '../../../helper/botManager';

export default () => {
  return (req: Request, res: Response, next: NextFunction) => {
    if (res.locals.alias) {
      res.locals.alias.remove()
        .then(alias => {
          botManager.removeAlias(req.session.userId, alias);
          return alias;
        })
        .then(alias => res.send(alias))
        .catch(error => {
          console.error(error);
          res.sendStatus(500);
        });
    } else {
      res.status(404).send('Timer was not found with the given id!');
    }
  };
};
