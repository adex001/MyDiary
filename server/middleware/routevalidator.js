import InputValidator from '../utilities/inputvalidators';
// Validated requests
class ValidateRoute {
  static validateUser(req, res, next) {
    const {
      firstname, lastname, sex,
    } = req.body;
    if (InputValidator.validateFirstname(firstname) === false) {
      return res.status(400).json({
        message: 'Enter a valid firstname',
      });
    }
    if (InputValidator.validateSex(sex) === false) {
      return res.status(400).json({
        message: 'Invalid entry for sex',
      });
    }
    if (InputValidator.validateLastname(lastname) === false) {
      return res.status(400).json({
        message: 'Invalid entry for lastname',
      });
    }
    next();
    return null;
  }

  static validateEntries(req, res, next) {
    const {
      entryTitle, entry, visibility,
    } = req.body;

    // Validate entries
    if (InputValidator.validateEntryTitle(entryTitle) === false) {
      return res.status(400).json({
        message: 'Entry title required!',
      });
    }
    if (InputValidator.validateEntry(entry) === false) {
      return res.status(400).json({
        message: 'Pls, enter an entry',
      });
    }
    if (InputValidator.validateEntryVisibility(visibility) === false) {
      return res.status(400).json({
        message: 'Entry visibility is required!',
      });
    }
    next();
    return null;
  }

  static validateAuthLogin(req, res, next) {
    const { email, plainPassword } = req.body;
    // Validate User
    if (InputValidator.validateEmail(email) === false) {
      return res.status(400).json({
        message: 'Enter a valid email',
      });
    }
    if (InputValidator.validatePassword(plainPassword) === false) {
      return res.status(400).json({
        message: 'Valid password required!',
      });
    }
    next();
    return null;
  }

  static validateAuthSignup(req, res, next) {
    const { firstname, username } = req.body;

    if (InputValidator.validateUsername(username) === false) {
      return res.status(400).json({
        message: 'Valid Username required',
      });
    }
    if (InputValidator.validateFirstname(firstname) === false) {
      return res.status(400).json({
        message: 'Valid Firstname is required',
      });
    }
    next();
    return null;
  }
}

export default ValidateRoute;
