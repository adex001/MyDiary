// Importing Router class from express
import { Router } from 'express';
import EntriesController from '../controller/entries';
import TokenHandler from '../middleware/tokenhandler';
import RouteValidator from '../middleware/routevalidator';
import checkEntryDate from '../middleware/checkentrydate';

const entriesRoute = Router();

entriesRoute.get('/', TokenHandler.verifyToken, EntriesController.fetchEntries);
entriesRoute.get('/public', EntriesController.fetchPublicEntries);
entriesRoute.get('/public/:entriesId', EntriesController.fetchSinglePublicEntry);
entriesRoute.get('/count', TokenHandler.verifyToken, EntriesController.countEntries);
entriesRoute.get('/:entriesId', TokenHandler.verifyToken, EntriesController.fetchSingleEntry);
entriesRoute.post('/', TokenHandler.verifyToken, RouteValidator.validateEntries, EntriesController.createEntry);
entriesRoute.put('/:entriesId', TokenHandler.verifyToken, RouteValidator.validateEntries, checkEntryDate, EntriesController.modifyEntry);
entriesRoute.delete('/:entriesId', TokenHandler.verifyToken, EntriesController.deleteEntry);

export default entriesRoute;
