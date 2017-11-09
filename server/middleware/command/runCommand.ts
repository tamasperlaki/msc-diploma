import { Request, Response, NextFunction } from 'express';
import { Command } from '../../../models/command';
import botManager from '../../helper/botManager';

export default () => {
  return (req: Request, res: Response, next: NextFunction) => {
    botManager.runCommand(req.session.userId, res.locals.command.name);
    res.send(200);
  };

};
