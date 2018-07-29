import validator from 'validator';

class InputValidators {
  static validateEmail(email) {
    if (typeof email === 'undefined') {
      return false;
    }
    const isEmail = validator.isEmail(email.trim());
    return isEmail;
  }

  static validatePassword(password) {
    if (typeof password === 'undefined' || validator.isEmpty(password)) {
      return false;
    }
    return true;
  }

  static validateUsername(username) {
    if (typeof username === 'undefined' || validator.isEmpty(username)) {
      return false;
    }
    return true;
  }

  static validateFirstname(firstname) {
    if (typeof firstname === 'undefined' || validator.isEmpty(firstname)) {
      return false;
    }
    return true;
  }

  static validateEntry(entry) {
    if (typeof entry === 'undefined' || validator.isEmpty(entry)) {
      return false;
    }
    return true;
  }

  static validateEntryTitle(entryTitle) {
    if (typeof entryTitle === 'undefined' || validator.isEmpty(entryTitle)) {
      return false;
    }
    return true;
  }

  static validateEntryVisibility(visibility) {
    if (typeof visibility === 'undefined' || validator.isEmpty(visibility)) {
      return false;
    }
    return true;
  }

  static validateSex(sex) {
    if (typeof sex === 'undefined' || validator.isEmpty(sex)) {
      return false;
    }
    return true;
  }

  static validateLastname(lastname) {
    if (typeof lastname === 'undefined' || validator.isEmpty(lastname)) {
      return false;
    }
    return true;
  }
}
export default InputValidators;
