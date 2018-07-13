// Importing Router class from express
import { Router } from 'express';

const entriesRoute = Router();

// Routes.
// Having a prefix of api/v1/entries
entriesRoute.get('/', (req, res) => {
  res.status(200).json({
    message: 'These are the entries',
  });
});

entriesRoute.get('/:entriesId', (req, res) => {
  res.status(200).json({
    message: 'Return an entry with a particular ID',
  });
});

entriesRoute.post('/', (req, res) => {
  res.status(200).json({
    message: 'This is the entries post route',
  });
});

entriesRoute.put('/', (req, res) => {
  res.status(200).json({
    message: 'This is the entries PUT route',
  });
});
export default entriesRoute;
