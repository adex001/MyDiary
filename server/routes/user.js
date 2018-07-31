import { Router } from 'express';

import UserController from '../controller/user';
import TokenHandler from '../middleware/tokenhandler';

const userRoute = Router();

userRoute.post('/forgotpassword', UserController.forgotPassword);
userRoute.post('/modifyprofile', TokenHandler.verifyToken, UserController.modifyProfile);

export default userRoute;
