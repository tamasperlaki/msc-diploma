import { Router } from 'express';
import createCommandMW from '../../../middleware/command/createCommand';
import getCommandForUserByNameMW from '../../../middleware/command/getCommandForUserByName';
import getCurrentUserCommandsMW from '../../../middleware/command/getCurrentUserCommands';

const routing = Router();

routing.post('/commands',
  getCommandForUserByNameMW(),
  createCommandMW());

routing.get('/commands/currentUser',
  getCurrentUserCommandsMW());

export default routing;
