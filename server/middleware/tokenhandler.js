import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

// Configure dotenv
dotenv.config();
class TokenHandler {
  static createToken(payload) {
    const token = jwt.sign(payload, process.env.SECRET_KEY);

    return token;
  }

  static checkToken(req, res, next) {
    const tokenHeader = req.headers.authorization;
    // Check if it exists
    if (typeof tokenHeader === 'undefined') {
      return res.status(403).json({
        message: 'No token provided!',
      });
    }
    // TOKEN FORMAT IS OF THE FORM Bearer <access_token>
    // We extract our token
    const token = tokenHeader.split(' ')[1];
    // We bind the token to the req object
    req.token = token;
    // go to the next middleware
    return next();
  }

  static verifyToken(req, res, next) {
    // Verify token
    jwt.verify(req.token, process.env.SECRET_KEY, (err) => {
      if (err) {
        res.status(403).json({
          message: 'Token cannot be verified',
        });
      } else {
      // send a JSON response
        next();
      }
    });
  }
}

export default TokenHandler;
