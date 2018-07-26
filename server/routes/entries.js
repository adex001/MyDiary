// Importing Router class from express
import { Router } from 'express';

// Imoport entries Controller
import EntriesController from '../controller/entries';
// Import Middlewares

import TokenHandler from '../middleware/tokenhandler';

const entriesRoute = Router();

// Routes.
// Having a prefix of api/v1/entries
// fetch all entries
entriesRoute.get('/', TokenHandler.checkToken, TokenHandler.verifyToken, EntriesController.fetchEntries);
entriesRoute.get('/:entriesId', TokenHandler.checkToken, TokenHandler.verifyToken, EntriesController.fetchSingleEntry);
entriesRoute.post('/', TokenHandler.checkToken, TokenHandler.verifyToken, EntriesController.createEntry);
entriesRoute.put('/:entriesId', TokenHandler.checkToken, TokenHandler.verifyToken, EntriesController.modifyEntry);
entriesRoute.delete('/:entriesId', TokenHandler.checkToken, TokenHandler.verifyToken, EntriesController.deleteEntry);

export default entriesRoute;
