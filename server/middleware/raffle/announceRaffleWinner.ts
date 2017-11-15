import { Request, Response, NextFunction } from 'express';
import botManager from '../../helper/botManager';

export default () => {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      botManager.sendMessage(req.session.userId, `${req.params.name} has won the raffle!`);

      res.sendStatus(200);
    } catch (e) {
      console.error(e);
      res.sendStatus(500);
    }
  };
};
