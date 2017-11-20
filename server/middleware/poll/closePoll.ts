import { Request, Response, NextFunction } from 'express';
import { chain } from 'lodash';
import redis from '../../config/redis';
import botManager from '../../helper/botManager';
import eventLogger from '../../helper/eventLogger';

export default () => {
  return (req: Request, res: Response, next: NextFunction) => {
    redis.multi()
      .del(`poll:voters:${req.session.userId}`)
      .del(`poll:${req.session.userId}`)
      .srem('polls', `${req.session.userId}`)
      .exec((error, replies) => {
        const deleteVotersReply = replies[0];
        const deleteOptionsReply = replies[1];
        const removePollReply = replies[2];

        if (error) {
          return next(error);
        } else if (deleteVotersReply.code === 'ERR') {
          return next(deleteVotersReply);
        } else if (deleteOptionsReply.code === 'ERR') {
          return next(deleteOptionsReply);
        } else if (removePollReply.code === 'ERR') {
          return next(removePollReply);
        }

        botManager.closePoll(req.session.userId);
        eventLogger.info('Closed Poll', {channel: req.session.channel, userId: req.session.userId});
        return res.sendStatus(200);
      });
  };
};
