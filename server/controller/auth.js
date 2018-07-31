import bcrypt from 'bcrypt';
import TokenHandler from '../middleware/tokenhandler';
import pool from '../database/connectDatabase';
import InputValidator from '../utilities/inputvalidators';

class AuthController {
  static login(req, res) {
    // Get the details of user from req body
    const { email, plainPassword } = req.body;
    // Validate User
    if (InputValidator.validateEmail(email) === false) {
      return res.status(400).json({
        message: 'Enter a valid email',
      });
    }
    if (InputValidator.validatePassword(plainPassword) === false) {
      return res.status(400).json({
        message: 'Valid password required!',
      });
    }
    // Find an email by searching through the database
    pool.query(`SELECT * from users WHERE email = '${email}'`, (err, result) => {
      // If email doesnt exist, return users not found or login failed
      if (err) {
        return res.status(500).json({
          message: 'Login failed! No connection to database.',
        });
      }

      if (result.rowCount < 1) {
        return res.status(404).json({
          message: 'Login failed! No such email',
        });
      }
      // User exists, go ahead to validate password
      const isCorrectPassword = bcrypt.compareSync(plainPassword, result.rows[0].password);
      if (!isCorrectPassword) {
        // if it is not a correct password, return error incorrect parameters
        return res.status(401).json({
          message: 'Login failed!',
        });
      }
      // else Attempt to create a token and authenticate
      const loginToken = TokenHandler.createToken({ id: result.rows[0].userId });
      return res.status(200).json({
        message: 'Token created',
        loginToken,
      });
    });
    return null;
  }

  static signup(req, res) {
  // Get all parameters from the req.body
    const {
      firstname, lastname, username, email, plainPassword,
    } = req.body;

    // Validates the object
    if (InputValidator.validateEmail(email) === false) {
      return res.status(400).json({
        message: 'Enter a valid email!',
      });
    }
    if (InputValidator.validatePassword(plainPassword) === false) {
      return res.status(400).json({
        message: 'Valid password required!',
      });
    }
    if (InputValidator.validateUsername(username) === false) {
      return res.status(400).json({
        message: 'Valid Username required',
      });
    }
    if (InputValidator.validateFirstname(firstname) === false) {
      return res.status(400).json({
        message: 'Valid Firstname is required',
      });
    }
    // Encrypt the password with bcrypt.
    // Generate Salt round
    const saltRound = Math.floor(Math.random() * 5);
    const salt = bcrypt.genSaltSync(saltRound);
    const password = bcrypt.hashSync(plainPassword, salt);


    // Insert object into database
    pool.query(`INSERT INTO users (username, email, password, firstname, lastname) VALUES ( '${username}', '${email}', '${password}', '${firstname}', '${lastname}') RETURNING *;`, (err, result) => {
      // pool.end(); // returns the pool back.
      if (err) {
        console.log(err);
        return res.status(500).json({
          message: 'Server error has occured!',
        });
      }
      // Attempting to create a token
      // eslint-disable-nextline
      console.log('Data successfully created!');
      console.log(result.rows);
      const payload = {
        userId: result.rows[0].userid,
      };
      const token = TokenHandler.createToken(payload);
      return res.status(201).json({
        message: 'User signed up and token created',
        token,
        result,
      });
    });
    return null;
  }
}

export default AuthController;
