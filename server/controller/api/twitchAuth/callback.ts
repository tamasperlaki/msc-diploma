import { Router } from 'express';
import callbackMW from '../../../middleware/twitchAuth/callback';

const routing = Router()
  .get('/callback', callbackMW());

export default routing;
