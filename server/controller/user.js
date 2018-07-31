import pool from '../database/connectDatabase';
import InputValidator from '../utilities/inputvalidators';
/**
 * @class UserController
 * @param {*} req
 * @param {*} res
 * @exports {*} UserController
 */
class UserController {
  /**
 * @function forgotPassword
 * @param {*} req
 * @param {*} res
 * @returns {*} the link to reset password
 */
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

  /**
 * @function modifyProfile
 * @param {*} req
 * @param {*} res
 * @returns {*} the Modified Profile
 */
  static modifyProfile(req, res) {
    const {
      firstname, lastname, sex,
    } = req.body;
    const modifyProfile = `UPDATE users SET firstname = '${firstname}', lastname = '${lastname}', sex = '${sex}' WHERE userId = '${req.decoded.userId}' RETURNING *;`;
    pool.query(modifyProfile, (err, result) => {
      if (err) {
        return res.status(500).json({
          message: 'Cannot update entry',
        });
      }
      return res.status(200).json({
        message: 'User updated successfully',
        user: result.rows[0],
      });
    });
    return null;
  }
}
export default UserController;
