import { Router } from 'express';
import createCommandMW from '../../../middleware/command/createCommand';
import getCommandByNameMW from '../../../middleware/command/getCommandByName';
import getAliasByNameMW from '../../../middleware/command/alias/getAliasByName';
import getCommandsMW from '../../../middleware/command/getCommands';
import getCommandByIdMW from '../../../middleware/command/getCommandById';
import deleteCommandMW from '../../../middleware/command/deleteCommand';
import updateCommandMW from '../../../middleware/command/updateCommand';
import runCommandMW from '../../../middleware/command/runCommand';

import getCurrentUserMW from '../../../middleware/user/getCurrentUser';

const url = '/commands';

const routing = Router();

routing.post(`${url}`,
  getCommandByNameMW(),
  getAliasByNameMW(),
  createCommandMW());

routing.delete(`${url}/:id`,
  getCommandByIdMW(),
  deleteCommandMW());

routing.put(`${url}/:id`,
  getCommandByIdMW(),
  updateCommandMW());

routing.get(`${url}`,
  getCommandsMW());

routing.post(`${url}/run/:id`,
  getCommandByIdMW(),
  runCommandMW());

export default routing;
