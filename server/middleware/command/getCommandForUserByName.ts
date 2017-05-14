import { Request, Response, NextFunction } from 'express';
import Command from "../../models/command";

export default () => {
  return (req: Request, res: Response, next: NextFunction) => {
    Command
      .findOne({
        "user.id": req.session.user._id,
        "name": req.params.name
       })
      .then((command) => {
        res.locals.command = command;
        next();
      })
      .catch(() => {
        res.sendStatus(500);
      });
  }
};
