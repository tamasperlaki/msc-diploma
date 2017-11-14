import { Router } from 'express';
import isRaffleOpenMW from '../../../middleware/raffle/isRaffleOpen';
import openRaffleMW from '../../../middleware/raffle/openRaffle';
import resetRaffleMW from '../../../middleware/raffle/resetRaffle';
import closeRaffleMW from '../../../middleware/raffle/closeRaffle';

const routing = Router();

routing.get('/isopen',
  isRaffleOpenMW());

routing.post('/open',
  openRaffleMW());

routing.delete('/reset',
  resetRaffleMW());

routing.delete('/close',
  closeRaffleMW());

export default routing;
