import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';

// Configure dotenv
dotenv.config();

class AuthController {
  static login(req, res) {
    // Get the details of user from req body
    // USERS
    const users = [{
      email: 'adeoye',
      password: 'password',
    }];
    const { email, password } = req.body;
    // Find an email by searching through the database
    const checkEmail = userObject => userObject.email === email;
    const user = users.find(checkEmail);

    if (user) {
      // Validate with password
      if (user.email === email && user.password === password) {
        console.log('Validation Successful');

        // Attempting to create a token
        const secretKey = process.env.SECRET_KEY;
        const token = jwt.sign(user, secretKey);

        return res.status(200).json({
          message: 'Token created',
          token,
        });
      }
      return res.status(400).json({
        message: 'Validation failed',
      });
    }
    return res.status(404).json({
      message: 'User was not found',
    });
  }
}

export default AuthController;
