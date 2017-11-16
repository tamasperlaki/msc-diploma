import { Router } from 'express';
import openPollMW from '../../../middleware/poll/openPoll';

const routing = Router();

routing.get('/isopen',

);

routing.post('/open',
  openPollMW());

export default routing;
