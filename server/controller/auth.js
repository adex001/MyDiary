import dotenv from 'dotenv';
import TokenHandler from '../middleware/tokenhandler';

// Configure dotenv
dotenv.config();

class AuthController {
  static login(req, res) {
    // Get the details of user from req body
    // USERS
    const users = [
      {
        email: 'adeoye',
        password: 'password',
      },
      {
        email: 'testing',
        password: 'tester',
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
        const loginToken = TokenHandler.createToken(user);

        return res.status(200).json({
          message: 'Token created',
          loginToken,
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

  static signup(req, res) {
  // Get all parameters from the req.body
    const {
      firstname, lastname, username, email, password,
    } = req.body;

    // Validates the object
    // If successfully updated
    const mockUsers = [
      {
        email: 'adeoye',
        firstname,
        lastname,
        username,
        password: 'password',
      },
      {
        email: 'testing',
        firstname,
        lastname,
        username,
        password: 'password',
      }];

    const checkEmail = userObject => userObject.email === email;
    const user = mockUsers.find(checkEmail);

    if (user) {
      // Validate the password
      if (user.email === email && user.password === password) {
        console.log('Validation Successful');

        // Attempting to create a token
        const token = TokenHandler.createToken(user);

        return res.status(201).json({
          message: 'User signed up and token created',
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
