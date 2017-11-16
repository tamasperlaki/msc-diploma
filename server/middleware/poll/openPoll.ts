import { Request, Response, NextFunction } from 'express';
import { chain } from 'lodash';
import redis from '../../config/redis';
import botManager from '../../helper/botManager';
import eventLogger from '../../helper/eventLogger';
import {  } from 'redis';

export default () => {
  return (req: Request, res: Response, next: NextFunction) => {
    const options: string[] = req.body.options;
    const optionsArg = chain(options)
      .map(option => [0, option])
      .flatten()
      .value();

    redis.batch()
      .sadd('polls', `${req.session.userId}`)
      .zadd(`poll:${req.session.userId}`, optionsArg)
      .exec((error, replies) => {
        const addPollReply = replies[0];
        const addOptionsReply = replies[1]

        if (error) {
          return next(error);
        } else if (addPollReply.code === "ERR") {
          return next(addPollReply);
        } else if (addOptionsReply.code === "ERR") {
          return next(addOptionsReply);
        } else if (addPollReply !== 1) {
          res.status(400);
          return next(new Error('Poll was already opened!'));
        }

        // botManager.openPoll(req.session.userId);
        eventLogger.info('Opened Poll', {channel: req.session.channel, userId: req.session.userId});
        return res.sendStatus(200);
      });
  };
};
