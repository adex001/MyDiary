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

    if (found !== undefined) {
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
      entryId, entriesTitle, entry, visibility, userId,
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
      userId,
    };

    // Push the object to the database
    datas.push(entryObject);
    res.status(201).json({
      message: 'entry created successfully',
      entry: datas[datas.length - 1],
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
      entriesTitle, entry, visibility,
    } = req.body;
    // Loops through the data array and search for the entriesId
    const Searcher = Objectid => Objectid.entriesId === entriesId;

    // Find the entry
    const found = datas.find(Searcher);
    // If entry was found, then update the entry
    if (found) {
      // Update the entry
      found.entriesTitle = entriesTitle;
      found.entry = entry;
      found.visibility = visibility;

      res.status(200).json({
        message: 'entry has been modified',
        entry: found,
      });
    } else {
      res.status(404).json({
        message: 'entry not found',
      });
    }
  }

  /**
   * A controller to delete an entry
   */
  static deleteEntry(req, res) {
    // Collects the entriesId
    const { entriesId } = req.params;

    // Loops through the data array and search for the entriesId
    const Searcher = Objectid => Objectid.entriesId === entriesId;

    // Find the entry
    const found = datas.find(Searcher);

    // If entry was found, then delete the entry
    if (found) {
      // find the position of the element and delete
      datas.splice(datas.indexOf(found), 1);

      res.status(204).json({
        message: 'entry deleted successfully',
      });
    } else {
      res.status(404).json({
        message: 'entry not found.',
      });
    }
  }
}

export default EntriesController;
