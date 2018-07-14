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
    // Parseint(radix 10 converts to decimal)
    const Searcher = Objectid => Objectid.entriesId === parseInt(entriesId, 10);

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
}

export default EntriesController;
