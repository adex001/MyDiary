// Importing Router class from express
import { Router } from 'express';

// Import the Controllers
import AuthController from '../controller/auth';

const authRoute = Router();

authRoute.post('/login', AuthController.login);
authRoute.post('/signup', AuthController.signup);


export default authRoute;
