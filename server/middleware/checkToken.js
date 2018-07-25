const checkToken = (req, res, next) => {
  const tokenHeader = req.headers.authorization;
  // Check if it exists
  if (typeof tokenHeader !== 'undefined') {
    // TOKEN FORMAT IS OF THE FORM Bearer <access_token>
    // We extract our token
    const token = tokenHeader.split(' ')[1];

    // We bind the token to the req object
    req.token = token;

    next();
  } return res.status(400).json({
    message: 'No token provided',
  });
};
export default checkToken;
