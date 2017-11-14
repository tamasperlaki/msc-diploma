import { Request, Response, NextFunction } from 'express';
import { Command } from '../../../models/command';
import botManager from '../../helper/botManager';
import eventLogger from '../../helper/eventLogger';

export default () => {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      botManager.runCommand(req.session.userId, res.locals.command.name);
      eventLogger.info('Ran command', {channel: req.session.channel, userId: req.session.userId, command: res.locals.command.name});

      res.sendStatus(200);
    } catch (e) {
      console.error(e);
      res.sendStatus(500);
    }
  };

};
