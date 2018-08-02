import pool from '../database/connectDatabase';
/**
 * @class QueryHelper
 * @export {*} QueryHelper
 */
class QueryHelper {
/**
 * @function emptyDatabase
 * @param {*} req
 * @param {*} res
 * @returns {*} empty all contents in the table
 */
  static emptyTable(tableName) {
    const dropQuery = `DELETE FROM ${tableName} RETURNING *`;
    pool.query(dropQuery);
  }
}
export default QueryHelper;
