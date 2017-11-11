import { Router } from 'express';
import getTimerByNameMW from '../../../middleware/command/timer/getTimerByName';
import getTimerByIdMW from '../../../middleware/command/timer/getTimerById';
import createTimerMW from '../../../middleware/command/timer/createTimer';
import updateTimerMW from '../../../middleware/command/timer/updateTimer';
import deleteTimerMW from '../../../middleware/command/timer/deleteTimer';
import getTimersMW from '../../../middleware/command/timer/getTimers';

const url = '/timers';

const routing = Router();

routing.post(`${url}`,
  getTimerByNameMW(),
  createTimerMW());

routing.put(`${url}/:id`,
  getTimerByIdMW(),
  updateTimerMW());

routing.delete(`${url}/:id`,
  getTimerByIdMW(),
  deleteTimerMW());

routing.get(`${url}`,
  getTimersMW());

export default routing;
