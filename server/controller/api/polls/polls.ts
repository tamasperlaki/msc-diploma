import { Router } from 'express';
import openPollMW from '../../../middleware/poll/openPoll';
import mapPollResultsMW from '../../../middleware/poll/mapPollResults';
import isPollOpenMW from '../../../middleware/poll/isPollOpen';

const routing = Router();

routing.get('/isopen',
  isPollOpenMW(),
  mapPollResultsMW());

routing.post('/open',
  openPollMW());

export default routing;
