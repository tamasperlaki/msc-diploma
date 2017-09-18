import { Router } from 'express';
import getUserByTokenMW from '../../../middleware/user/getUserByToken';

const routing = Router()
  .get('/authenticate', getUserByTokenMW());

export default routing;
