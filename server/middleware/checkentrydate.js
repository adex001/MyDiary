import pool from '../database/connectDatabase';

const checkEntryDate = ((req, res, next) => {
  const checkQuery = `SELECT * FROM entries WHERE userid = '${req.decoded.userId}';`;
  pool.query(checkQuery, (err, result) => {
    if (err) {
      return res.status(500).json({
        message: 'Internal server error',
        err,
      });
    }
    const entryCreated = new Date(result.rows[0].timecreated);
    const today = new Date();
    const serverHour = new Date().getHours();
    if (entryCreated.getDate() === today.getDate() && serverHour <= 24) {
      return next();
    }
    return next();
  });
});
export default checkEntryDate;
