import bcrypt from 'bcrypt';
import TokenHandler from '../middleware/tokenhandler';
import pool from '../database/connectDatabase';
/**
 * @class AuthCOntroller
 * @exports {*} Auth Controller
 */
class AuthController {
  /**
 * @function login
 * @param {*} req
 * @param {*} res
 * @returns {*} the token
 */
  static login(req, res) {
    const { email, plainPassword } = req.body;
    pool.query(`SELECT * from users WHERE email = '${email}'`, (err, result) => {
      if (err) {
        return res.status(500).json({
          message: 'Login failed!',
        });
      }

      if (result.rowCount < 1) {
        return res.status(404).json({
          message: 'Login failed! No such email',
        });
      }
      const isCorrectPassword = bcrypt.compareSync(plainPassword, result.rows[0].password);
      if (!isCorrectPassword) {
        return res.status(400).json({
          message: 'Login failed!',
        });
      }
      const payload = {
        userId: result.rows[0].userid,
      };
      const loginToken = TokenHandler.createToken(payload);
      return res.status(200).json({
        status: 'true',
        message: 'Token created',
        loginToken,
      });
    });
    return null;
  }

  /**
 * @function signup
 * @param {*} req
 * @param {*} res
 * @returns {*} the created user
 */
  static signup(req, res) {
    const {
      firstname, lastname, username, email, plainPassword,
    } = req.body;
    const saltRound = Math.floor(Math.random() * 5);
    const salt = bcrypt.genSaltSync(saltRound);
    const password = bcrypt.hashSync(plainPassword, salt);


    // Insert object into database
    pool.query(`INSERT INTO users (username, email, password, firstname, lastname) VALUES ('${username}', '${email}', '${password}', '${firstname}', '${lastname}') RETURNING *;`, (err, result) => {
      // pool.end(); // returns the pool back.
      if (err) {
        return res.status(500).json({
          message: 'Server error has occured!',
        });
      }
      const payload = {
        userId: result.rows[0].userid,
      };
      const token = TokenHandler.createToken(payload);
      return res.status(201).json({
        status: 'true',
        message: 'User signed up and token created',
        token,

      });
    });
    return null;
  }
}

export default AuthController;
