// Importing Router class from express
import { Router } from 'express';

// Import the Controllers
import UserController from '../controller/user';
// Import Middlewares
import TokenHandler from '../middleware/tokenhandler';

const userRoute = Router();

userRoute.post('/forgotpassword', UserController.forgotPassword);
userRoute.post('/modifyprofile', TokenHandler.verifyToken, UserController.modifyProfile);

export default userRoute;
