// Importing Router class from express
import { Router } from 'express';

// Import the Controllers
import AuthController from '../controller/auth';
// Import Middlewares
import TokenHandler from '../middleware/tokenhandler';

const authRoute = Router();

authRoute.post('/login', AuthController.login);
authRoute.post('/signup', AuthController.signup);
authRoute.post('/forgotpassword', AuthController.forgotPassword);
authRoute.post('/modifyprofile', TokenHandler.checkToken, TokenHandler.verifyToken, AuthController.modifyProfile);

export default authRoute;
