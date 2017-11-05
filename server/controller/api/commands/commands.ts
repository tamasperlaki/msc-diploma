import { Router } from 'express';
import createCommandMW from '../../../middleware/command/createCommand';
import getCommandForUserByNameMW from '../../../middleware/command/getCommandForUserByName';
import getCurrentUserCommandsMW from '../../../middleware/command/getCurrentUserCommands';
import getCommandForUserByIdMW from '../../../middleware/command/getCommandForUserById';
import deleteCommandMW from '../../../middleware/command/deleteCommand';

const routing = Router();

routing.post('/commands',
  getCommandForUserByNameMW(),
  createCommandMW());

routing.delete('/commands',
  getCommandForUserByIdMW(),
  deleteCommandMW());

routing.get('/commands/currentUser',
  getCurrentUserCommandsMW());

export default routing;
