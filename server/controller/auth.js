import dotenv from 'dotenv';
import bcrypt from 'bcrypt';
import TokenHandler from '../middleware/tokenhandler';
import pool from '../database/connectDatabase';


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
      firstname, lastname, username, email, plainPassword,
    } = req.body;

    // Validates the object
    // Encrypt the password with bcrypt.
    // Generate Salt round
    const saltRound = Math.floor(Math.random() * 5);
    const salt = bcrypt.genSaltSync(saltRound);
    const password = bcrypt.hashSync(plainPassword, salt);


    // Insert object into database
    pool.query(`INSERT INTO users (username, email, password, firstname, lastname) VALUES ( '${username}', '${email}', '${password}', '${firstname}', '${lastname}');`, (err, result) => {
      if (err) {
        console.log(err);
        return res.status(500).json({
          message: 'Server error has occured!',
        });
      }
      // Attempting to create a token
      // eslint-disable-nextline
      console.log('Data successfully created!');
      console.log(result);
      const payload = {
        email,
        username,
        firstname,
      };
      const token = TokenHandler.createToken(payload);
      return res.status(201).json({
        message: 'User signed up and token created',
        token,
        result,
      });
    });
  }
}

export default AuthController;
