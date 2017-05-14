import { Router } from 'express';
import getUserMW from "../../../middleware/user/getUser";

var routing = Router()
  .get('/user', getUserMW());

export default routing;
