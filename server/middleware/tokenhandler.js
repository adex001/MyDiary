import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

// Configure dotenv
dotenv.config();

/**
 * @class TokenHandler
 * @export {*} the token handler object
 */
class TokenHandler {
  /**
 * @function createToken
 * @param {*} req
 * @param {*} res
 * @returns {*} a token
 */
  static createToken(payload) {
    const token = jwt.sign(payload, process.env.SECRET_KEY);

    return token;
  }
  /**
 * @function verifyToken
 * @param {*} req
 * @param {*} res
 * @returns {*} verified object and bund it to the req body
 */

  static verifyToken(req, res, next) {
    const { token } = req.headers;
    // Check if it exists
    if (typeof token === 'undefined') {
      return res.status(401).json({
        message: 'No token provided!',
      });
    }
    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    if (decoded) {
      req.decoded = decoded;
    } else {
      res.status(401).json('Token cannot be verified');
    }
    return next();
  }
}

export default TokenHandler;
