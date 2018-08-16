import pool from '../database/connectDatabase';

/**
 * @export EntriesController
 * @class EntriesController
 */
class EntriesController {
  /**
 * @function fetchEntries
 * @param {*} req
 * @param {*} res
 * @returns {*} All specific user entries
 */
  static fetchEntries(req, res) {
    const fetchEntryQuery = `SELECT * FROM entries WHERE userid = '${req.decoded.userId}';`;
    pool.query(fetchEntryQuery, (err, result) => {
      if (err) {
        return res.status(500).json({
          message: 'Something went wrong!',
        });
      }
      if (result.rowCount < 1) {
        return res.status(200).json({
          message: 'No entry',
        });
      }
      return res.status(200).json({
        status: 'true',
        message: 'All entries by users',
        entries: result.rows,
      });
    });

    return null;
  } /**
  * @function fetchEntries
  * @param {*} req
  * @param {*} res
  * @returns {*} Email notification
  */

  static fetchSingleEntry(req, res) {
    const { entriesId } = req.params;
    const findEntryQuery = `SELECT * FROM entries WHERE entriesId = '${entriesId}' AND userid = '${req.decoded.userId}';`;
    pool.query(findEntryQuery, (err, result) => {
      if (err) {
        return res.status(500).json({
          message: 'Something went wrong!',
        });
      }
      if (result.rowCount < 1) {
        return res.status(404).json({
          status: 'empty',
          message: 'No such entry',
        });
      }
      return res.status(200).json({
        status: 'true',
        message: 'Entry found',
        entry: result.rows[0],
      });
    });
    return null;
  }

  /**
  * @function fetchEntries
  * @param {*} req
  * @param {*} res
  * @returns {*} Email notification
  */
  static fetchPublicEntries(req, res) {
    const publicQuery = 'SELECT * FROM entries WHERE visibility = true';
    pool.query(publicQuery, (err, result) => {
      if (err) {
        return res.status(500).json({
          message: 'internal server error',
        });
      }
      return res.status(200).json({
        status: 'true',
        message: 'All public entries',
        entries: result.rows,
      });
    });
  }

  /**
  * @function fetchEntries
  * @param {*} req
  * @param {*} res
  * @returns {*} Email notification
  */
  static fetchSinglePublicEntry(req, res) {
    const { entriesId } = req.params;
    const publicQuery = `SELECT * FROM entries WHERE entriesId = '${entriesId}' AND visibility = true`;
    pool.query(publicQuery, (err, result) => {
      if (err) {
        return res.status(500).json({
          message: 'internal server error',
        });
      }
      if (result.rowCount < 1) {
        return res.status(404).json({
          message: 'This is pure hacking!',
        });
      }
      return res.status(200).json({
        status: 'true',
        message: 'Single Public Entry',
        publicEntry: result.rows,
      });
    });
  }

  /**
 * @function createEntry
 * @param {*} req
 * @param {*} res
 * @returns {*} the created entry
 */

  static createEntry(req, res) {
    const {
      entryTitle, entry, visibility,
    } = req.body;

    const createEntryQuery = `INSERT INTO entries (entry, entryTitle, visibility, userId) VALUES ('${entry}', '${entryTitle}', '${visibility}', '${req.decoded.userId}') RETURNING *;`;
    pool.query(createEntryQuery, (err, result) => {
      if (err) {
        return res.status(500).json({
          message: 'Internal server error! Are you sure you have account with us?',
        });
      }
      if (result.rowCount < 1) {
        return res.status(400).json({
          message: 'Cannot create entry',
        });
      }
      return res.status(201).json({
        status: 'true',
        message: 'Entries created successfully',
      });
    });
  }

  /**
 * @function modifyEntry
 * @param {*} req
 * @param {*} res
 * @returns {*} the entry modified
 */
  static modifyEntry(req, res) {
    // Collects the entriesId
    const { entriesId } = req.params;
    const {
      entryTitle, entry, visibility,
    } = req.body;
    // Update SQL query
    const updateEntryQuery = `UPDATE entries SET entryTitle = '${entryTitle}', entry = '${entry}', visibility = '${visibility}' WHERE entriesId = '${parseInt(entriesId, 10)}' AND userId = '${req.decoded.userId}' RETURNING *;`;
    pool.query(updateEntryQuery, (err, result) => {
      if (err) {
        return res.status(500).json({
          message: 'internal server error',
        });
      }
      if (result.rowCount < 1) {
        return res.status(404).json({
          message: 'entry not found',
        });
      }
      return res.status(200).json({
        status: 'true',
        message: 'successfully updated',
      });
    });
    return null;
  }

  /**
 * @function deleteEntry
 * @param {*} req
 * @param {*} res
 * @returns {*} the deleted entry
 */
  static deleteEntry(req, res) {
    const { entriesId } = req.params;
    const deleteEntryQuery = `DELETE FROM entries WHERE entriesId = '${parseInt(entriesId, 10)}' AND userId = '${req.decoded.userId}' RETURNING *;`;

    pool.query(deleteEntryQuery, (err, result) => {
      if (result.rowCount < 1) {
        return res.status(404).json({
          message: 'Entry not found!!',
        });
      }
      return res.status(200).json({
        status: 'true',
        message: 'Entry Deleted!!',
        entryDeleted: result.rows[0],
      });
    });

    //
  }

  /**
 * @function countEntries
 * @param {*} req
 * @param {*} res
 * @returns {*} the total number of entries for a specific user
 */
  static countEntries(req, res) {
    const countQuery = `SELECT COUNT(entriesId) FROM entries WHERE userId = '${req.decoded.userId}'`;
    pool.query(countQuery, (err, result) => {
      if (err) {
        return res.status(500).json({
          message: 'Internal Server error',
        });
      }
      res.status(200).json({
        status: 'true',
        message: 'Entries count',
        count: result.rows[0].count,

      });
      return null;
    });
    return null;
  }
}

export default EntriesController;
