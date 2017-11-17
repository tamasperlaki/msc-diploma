import { Router } from 'express';
import openPollMW from '../../../middleware/poll/openPoll';
import isPollOpenMW from '../../../middleware/poll/isPollOpen';

const routing = Router();

routing.get('/isopen',
  isPollOpenMW());

routing.post('/open',
  openPollMW());

export default routing;
