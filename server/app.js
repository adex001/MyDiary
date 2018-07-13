import express from 'express';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';


// Configure dotenv
dotenv.config();

const app = express();

// App to Use these 

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


const port = process.env.PORT || 3000;

app.get('/', (req, res) => {
  res.status(200).json({
    message: 'You reached my homepage successfully.'
  });
});

app.listen(port, () => {
  console.log(`App started on port ${port}`);
})

export default app; // For testing purposes