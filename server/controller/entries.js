import pool from '../database/connectDatabase';

class EntriesController {
  /**
   * A controller to fetch all entries from the database.
   */
  static fetchEntries(req, res) {
    // retrieve all entries from the database FOR NOW!!!.
    const fetchEntryQuery = 'SELECT * FROM entries;';
    pool.query(fetchEntryQuery, (err, result) => {
      if (err) {
        return res.status(500).json({
          message: 'Unable to connect!',
        });
      }
      if (result.rowCount < 1) {
        return res.status(404).json({
          message: 'No entry',
        });
      }
      return res.status(200).json({
        message: 'All entries by users',
        entries: result.rows,
      });
    });
  }

  /**
   * A controller to fetch a specific entry
   */
  static fetchSingleEntry(req, res) {
    const { entriesId } = req.params;
    // Searches the particular entry from the database
    const findEntryQuery = `SELECT * FROM entries WHERE entriesId = '${entriesId}';`;
    pool.query(findEntryQuery, (err, result) => {
      if (err) {
        return res.status(500).json({
          message: 'internal server error!',
        });
      }
      if (result.rowCount < 1) {
        return res.status(404).json({
          message: 'No such entry',
        });
      }
      return res.status(200).json({
        message: 'Entry found',
        entry: result.rows[0],
      });
    });
  }

  /**
 * A controller to add an new entry to the database
 *    Create an object then push to the database.
 */
  static createEntry(req, res) {
    // Get parameters from the req.body
    const {
      entryTitle, entry, visibility, userId,
    } = req.body;
    // Gets userId from the token

    // Validation happens here
    // Create an entry object
    // Push the object to the database
    const createEntryQuery = `INSERT INTO entries (entry, entryTitle, visibility, userId) VALUES ('${entry}', '${entryTitle}', '${visibility}', '${userId}');`;
    pool.query(createEntryQuery, (err, result) => {
      if (err) {
        return res.status(500).json({
          message: 'Internal Server Error',
          err,
        });
      }
      return res.status(201).json({
        message: 'Entries created successfully',
        entry: result.rows[0],
      });
    });
  }

  /**
   * A controller to update an entry
   */
  static modifyEntry(req, res) {
    // Collects the entriesId
    const { entriesId } = req.params;
    // Get parameters from the req.body
    const {
      entryTitle, entry, visibility,
    } = req.body;

    // Validate entries

    // Update SQL query
    const updateEntryQuery = `UPDATE entries SET entryTitle = '${entryTitle}', entry = '${entry}', visibility = '${visibility}' WHERE entriesId = '${parseInt(entriesId, 10)}';`;
    pool.query(updateEntryQuery, (err, result) => {
      if (err) {
        return res.status(500).json({
          message: 'internal server error',
          err,
        });
      }
      return res.status(200).json({
        message: 'successfully updated',
        entry: result.rows,
      });
    });
  }

  /**
   * A controller to delete an entry
   */
  static deleteEntry(req, res) {
    // Collects the entriesId
    const { entriesId } = req.params;

    // Delete entry from entries where entryId is something
    const deleteEntryQuery = `DELETE FROM entries WHERE entriesId = ${entriesId};`;

    pool.query(deleteEntryQuery, (err, result) => {
      if (err) {
        return res.status(500).json({
          message: 'internal server error',
        });
      }
      // Does not show content but response is deleted.
      if (result.rowCount < 1) {
        return res.status(404).json({
          message: 'User not found!!',
        });
      }
      return res.status(204);
    });

    //
  }
}

export default EntriesController;
