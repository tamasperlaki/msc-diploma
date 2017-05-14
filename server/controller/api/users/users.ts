import { Router } from 'express';
import getUserByTokenMW from "../../../middleware/user/getUserByToken";

var routing = Router()
  .get('/authenticate', getUserByTokenMW());

export default routing;
