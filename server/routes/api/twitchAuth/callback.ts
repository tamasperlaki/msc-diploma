import { Router } from 'express';
import callbackMW from "../../../middleware/twitchAuth/callback";

var routing = Router()
  .get('/callback', callbackMW());

export default routing;
