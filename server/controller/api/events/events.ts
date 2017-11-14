import { Router } from 'express';
import getEventsMW from '../../../middleware/event/getEvents';

const routing = Router()
  .get('', getEventsMW());

export default routing;
