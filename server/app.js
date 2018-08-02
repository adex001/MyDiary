import express from 'express';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import cors from 'cors';

import entriesRoute from './routes/entries';
import authRoute from './routes/auth';
import userRoute from './routes/user';


// Configure dotenv
dotenv.config();

const app = express();
// App to Use these middlewares

// Configure body-parser and cors
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

// Register routes
app.use('/api/v1/entries', entriesRoute);
app.use('/api/v1/auth', authRoute);
app.use('/api/v1/user', userRoute);


const port = process.env.PORT || 4000;

app.get('/', (req, res) => {
  res.status(200).json({
    message: 'You reached my homepage successfully.',
  });
});

app.listen(port, () => {
  // eslint-disable-next-line
  console.log(`App started on port ${port}`);
});

export default app; // For testing purposes
