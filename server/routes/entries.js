// Importing Router class from express
import { Router } from 'express';

// Imoport entries Controller
import EntriesController from '../controller/entries';

const entriesRoute = Router();

// Routes.
// Having a prefix of api/v1/entries
// fetch all entries
entriesRoute.get('/', EntriesController.fetchEntries);

entriesRoute.get('/:entriesId', EntriesController.fetchSingleEntry);

entriesRoute.post('/', EntriesController.createEntry);

entriesRoute.put('/:entriesId', EntriesController.modifyEntry);

entriesRoute.delete('/:entriesId', EntriesController.deleteEntry);


export default entriesRoute;
