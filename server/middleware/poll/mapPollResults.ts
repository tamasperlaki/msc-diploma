import { Request, Response, NextFunction } from 'express';
import { isArray, chain } from 'lodash';
import redis from '../../config/redis';

export default () => {
  return (req: Request, res: Response, next: NextFunction) => {
    if(!isArray(res.locals.pollResults)) {
      return next(new Error('Poll results should be in the locals!'));
    }

    const mappedPollResults = chain(res.locals.pollResults)
      .chunk(2)
      .fromPairs()
      .value();

    return res.send(mappedPollResults);
  };
};
