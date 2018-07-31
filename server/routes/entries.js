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
entriesRoute.get('/', TokenHandler.verifyToken, EntriesController.fetchEntries);
entriesRoute.get('/count', TokenHandler.verifyToken, EntriesController.countEntries);
entriesRoute.get('/:entriesId', TokenHandler.verifyToken, EntriesController.fetchSingleEntry);
entriesRoute.post('/', TokenHandler.verifyToken, EntriesController.createEntry);
entriesRoute.put('/:entriesId', TokenHandler.verifyToken, EntriesController.modifyEntry);
entriesRoute.delete('/:entriesId', TokenHandler.verifyToken, EntriesController.deleteEntry);

export default entriesRoute;
