import { Router } from 'express';
import createTimerMW from '../../../middleware/command/timer/createTimer';
import getTimerForUserByNameMW from '../../../middleware/command/timer/getTimerForUserByName';

const routing = Router();

routing.post('/timers',
  getTimerForUserByNameMW(),
  createTimerMW());

export default routing;
