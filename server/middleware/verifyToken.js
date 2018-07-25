import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();
let myData;
const verifyToken = (req, res, next) => {
  myData = jwt.verify(req.token, process.env.SECRET_KEY);
  if (myData) {
    // It means it's correctectly verified

    next();
  } return res.status(403).json({
    message: 'Token cannot be verified',
  });
};

export default { myData, verifyToken };
