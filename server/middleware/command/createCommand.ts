import { Request, Response, NextFunction } from 'express';
import Command from "../../models/command";
import User from "../../models/user";
import * as async from "async";

export default () => {
  return (req: Request, res: Response, next: NextFunction) => {
    if(!res.locals.command) {
      var command = new Command();
      command.name = req.body.name;
      command.text = req.body.text;
      command.enabled = true;
      command.user = req.session.user._id;

      command.save()
        .then((command) => {
          return User.findById(req.session.user._id);
        })
        .then((user) => {
          user.commands.push(command._id);
          return user.save();
        })
        .then(() => {
          res.send(JSON.stringify(command));
        })
        .catch((error) => {
          console.error(error);
          res.sendStatus(500);
        });
    } else {
      res.sendStatus(400);
    }
  }
};
