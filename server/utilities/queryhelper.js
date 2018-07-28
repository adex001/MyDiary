import pool from '../database/connectDatabase';

class QueryHelper {
  static emptyDatabase(tableName) {
    // drop all contents in the database
    const dropQuery = `DELETE FROM ${tableName} RETURNING *`;
    pool.query(dropQuery);
  }
}
export default QueryHelper;
