import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

// Configure dotenv
dotenv.config();
class TokenHandler {
  static createToken(payload) {
    const token = jwt.sign(payload, process.env.SECRET_KEY);

    return token;
  }

  static verifyToken(req, res, next) {
    const token = req.headers.authorization;
    // Check if it exists
    if (typeof token === 'undefined') {
      return res.status(401).json({
        message: 'No token provided!',
      });
    }
    try {
      const decoded = jwt.verify(token, process.env.SECRET_KEY);
      req.decoded = decoded;
    } catch (err) {
      return res.status(401).json('Token cannot be verified');
    }
    return next();
  }
}

export default TokenHandler;
