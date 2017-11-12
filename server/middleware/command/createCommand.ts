import { Request, Response, NextFunction } from 'express';
import { Command, ICommand } from '../../../models/command';
import { User } from '../../../models/user';
import botManager from '../../helper/botManager';
import eventLogger from '../../logger/eventLogger';

export default () => {
  return (req: Request, res: Response, next: NextFunction) => {
    if (res.locals.alias) {
      return res.status(400).send('An alias was already defined with this name');
    } else if (res.locals.command) {
      return res.status(400).send('A command was already defined with this name');
    }

    let savedCommand: ICommand;

    const command = new Command();
    command.name = req.body.name;
    command.text = req.body.text;
    command.enabled = true;
    command.user = req.session.userId;
    command.save()
      .then(result => {
        savedCommand = result;
        botManager.setCommand(req.session.userId, result);
      })
      .then(() => eventLogger.info('Added command', {channel: req.session.channel, command: savedCommand.name}))
      .then(() => res.send(savedCommand))
      .catch(error => {
        console.error(error);
        res.sendStatus(500);
      });
  };
};
