import { Request, Response, NextFunction } from 'express';
import { chain } from 'lodash';
import redis from '../../config/redis';
import eventLogger from '../../helper/eventLogger';

export default () => {
  return (req: Request, res: Response, next: NextFunction) => {
    redis.multi()
      .del(`poll:voters:${req.session.userId}`)
      .zrange(`poll:${req.session.userId}`, 0, -1)
      .exec((error, replies) => {
        const deleteVotersReply = replies[0];
        const getOptionsReply = replies[1];

        if (error) {
          return next(error);
        } else if (deleteVotersReply.code === 'ERR') {
          return next(deleteVotersReply);
        } else if (getOptionsReply.code === 'ERR') {
          return next(getOptionsReply);
        }

        const optionsArg = chain<string[]>(getOptionsReply)
          .map(option => [0, option])
          .flatten()
          .value();

        redis.zadd(`poll:${req.session.userId}`, optionsArg, (resetOptionsError, resetOptionsReply) => {
          if (resetOptionsError) {
            return next(resetOptionsError);
          }

          eventLogger.info('Reset Poll', {channel: req.session.channel, userId: req.session.userId});

          redis.zrange(`poll:${req.session.userId}`, 0, -1, 'WITHSCORES', (getVoteResultsError, getVoteResultsReply) => {
            if (getVoteResultsError) {
              return next(getVoteResultsError);
            }

            res.locals.pollResults = getVoteResultsReply;
            return next();
          });
        });
      });
  };
};
