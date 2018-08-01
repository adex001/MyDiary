import { Router } from 'express';
import AuthController from '../controller/auth';
import RouteValidator from '../middleware/routevalidator';

const authRoute = Router();

authRoute.post('/login', RouteValidator.validateAuthLogin, AuthController.login);
authRoute.post('/signup', RouteValidator.validateAuthLogin, RouteValidator.validateAuthSignup, AuthController.signup);


export default authRoute;
