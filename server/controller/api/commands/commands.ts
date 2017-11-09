import { Router } from 'express';
import createCommandMW from '../../../middleware/command/createCommand';
import getCommandForUserByNameMW from '../../../middleware/command/getCommandForUserByName';
import getCurrentUserCommandsMW from '../../../middleware/command/getCurrentUserCommands';
import getCommandForUserByIdMW from '../../../middleware/command/getCommandForUserById';
import deleteCommandMW from '../../../middleware/command/deleteCommand';
import updateCommandMW from '../../../middleware/command/updateCommand';
import runCommandMW from '../../../middleware/command/runCommand';

import getCurrentUserMW from '../../../middleware/user/getCurrentUser';

const routing = Router();

routing.post('/commands',
  getCommandForUserByNameMW(),
  getCurrentUserMW(),
  createCommandMW());

routing.delete('/commands/:id',
  getCurrentUserMW(),
  getCommandForUserByIdMW(),
  deleteCommandMW());

routing.put('/commands/:id',
  getCurrentUserMW(),
  getCommandForUserByIdMW(),
  updateCommandMW());

routing.get('/commands',
  getCurrentUserCommandsMW());

routing.post('/commands/run/:id',
  getCommandForUserByIdMW(),
  runCommandMW());

export default routing;
