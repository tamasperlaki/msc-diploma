import { Router } from 'express';
import getPollResultsMW from '../../../middleware/poll/getPollResults';
import openPollMW from '../../../middleware/poll/openPoll';
import mapPollResultsMW from '../../../middleware/poll/mapPollResults';
import isPollOpenMW from '../../../middleware/poll/isPollOpen';

const routing = Router();

routing.get('/',
  getPollResultsMW(),
  mapPollResultsMW());

routing.get('/isopen',
  isPollOpenMW());

routing.post('/open',
  openPollMW(),
  mapPollResultsMW());

export default routing;
