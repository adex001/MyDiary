import datas from '../dummymodel/requestdatas';

class EntriesController {
  /**
   * A controller to fetch all entries from the database.
   */
  static fetchEntries(req, res) {
    // retrieve all entries from the database.
    res.status(200).json({
      message: 'All entries by users',
      entries: datas,
    });
  }

  /**
   * A controller to fetch a specific entry
   */
  static fetchSingleEntry(req, res) {
    const { entriesId } = req.params;

    // Searches through the datas fo find a particular requestId

    // Write an helper function
    // Loops through the data array and search for the entriesId
    const Searcher = Objectid => Objectid.entriesId === (entriesId);

    // Find the entry
    const found = datas.find(Searcher);

    if (found) {
      res.status(200).json({
        message: 'found entry',
        entry: found,
      });
    } else {
      res.status(404).json({
        message: 'entry not found',
      });
    }
  }

  /**
 * A controller to add an new entry to the database
 *    Create an object then push to the database.
 */
  static createEntry(req, res) {
    // Get parameters from the req.body
    const {
      entryId, entriesTitle, entry, visibility,
    } = req.body;

    // Validation happens here
    // if error happens here, return an error response

    // Create an entry object
    const entryObject = {
      entryId,
      entriesTitle,
      entry,
      visibility,
      timestamp: new Date(),
    };

    // Push the object to the database
    datas.push(entryObject);
    res.status(201).json({
      message: 'entry created successfully',
      entry: datas[datas.length - 1],
    });
  }
}

export default EntriesController;
