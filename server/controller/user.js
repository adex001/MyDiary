import pool from '../database/connectDatabase';
import InputValidator from '../utilities/inputvalidators';

class UserController {
  static forgotPassword(req, res) {
    // Get email from body
    const { email } = req.body;
    if (InputValidator.validateEmail === false) {
      return res.status(400).json({
        message: 'Enter a valid email!',
      });
    }
    const query = `SELECT * FROM users WHERE email = '${email}'`;
    pool.query(query, (err, result) => {
      if (result.rowCount < 1) {
        return res.status(404).json({
          message: 'No such email',
        });
      }
      return res.status(200).json({
        message: 'An link has been sent to your email to recover password',
      });
    });
    return null;
  }

  static modifyProfile(req, res) {
    // Get userId from token
    // Get all parameters from the req.body
    const {
      firstname, lastname, sex,
    } = req.body;
    // Validated requests
    if (InputValidator.validateFirstname(firstname) === false) {
      return res.status(400).json({
        message: 'Enter a valid firstname',
      });
    }
    if (InputValidator.validateSex(sex) === false) {
      return res.status(400).json({
        message: 'Invalid entry for sex',
      });
    }
    if (InputValidator.validateLastname(lastname) === false) {
      return res.status(400).json({
        message: 'Invalid entry for lastname',
      });
    }
    return null;
  }
}
export default UserController;
