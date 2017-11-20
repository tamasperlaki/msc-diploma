import { Router } from 'express';
import getPollResultsMW from '../../../middleware/poll/getPollResults';
import openPollMW from '../../../middleware/poll/openPoll';
import mapPollResultsMW from '../../../middleware/poll/mapPollResults';
import isPollOpenMW from '../../../middleware/poll/isPollOpen';
import resetPollMW from '../../../middleware/poll/resetPoll';
import closePollMW from '../../../middleware/poll/closePoll';

const routing = Router();

routing.get('/',
  getPollResultsMW(),
  mapPollResultsMW());

routing.get('/isopen',
  isPollOpenMW());

routing.post('/open',
  openPollMW(),
  mapPollResultsMW());

routing.post('/reset',
  resetPollMW(),
  mapPollResultsMW());

routing.post('/close',
  closePollMW());

export default routing;
