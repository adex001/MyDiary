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
}

export default EntriesController;
