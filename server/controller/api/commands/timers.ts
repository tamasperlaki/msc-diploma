import { Router } from 'express';
import getTimerForUserByNameMW from '../../../middleware/command/timer/getTimerForUserByName';
import getTimerForUserByIdMW from '../../../middleware/command/timer/getTimerForUserById';
import createTimerMW from '../../../middleware/command/timer/createTimer';
import updateTimerMW from '../../../middleware/command/timer/updateTimer';
import deleteTimerMW from '../../../middleware/command/timer/deleteTimer';
import getCurrentUserTimersMW from '../../../middleware/command/timer/getCurrentUserTimers';

const routing = Router();

routing.post('/timers',
  getTimerForUserByNameMW(),
  createTimerMW());

routing.put('/timers/:id',
  getTimerForUserByIdMW(),
  updateTimerMW());

routing.delete('/timers/:id',
  getTimerForUserByIdMW(),
  deleteTimerMW());

routing.get('/timers',
  getCurrentUserTimersMW());

export default routing;
