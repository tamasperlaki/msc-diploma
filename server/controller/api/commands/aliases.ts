import { Router } from 'express';
import getCommandByNameMW from '../../../middleware/command/getCommandByName';
import getAliasByNameMW from '../../../middleware/command/alias/getAliasByName';
import createAliasMW from '../../../middleware/command/alias/createAlias';
import getAliasesMW from '../../../middleware/command/alias/getAliases';
import getAliasByIdMW from '../../../middleware/command/alias/getAliasById';
import deleteAliasMW from '../../../middleware/command/alias/deleteAlias';

const url = '/aliases';

const routing = Router();

routing.post(`${url}`,
  getCommandByNameMW(),
  getAliasByNameMW(),
  createAliasMW());

routing.get(`${url}`,
  getAliasesMW());

routing.delete(`${url}/:id`,
  getAliasByIdMW(),
  deleteAliasMW());

export default routing;
