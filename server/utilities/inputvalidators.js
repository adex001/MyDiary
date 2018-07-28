class InputValidators {
  static validateEmail(req, res) {
    const { email } = req.body;
    if (typeof email === 'undefined' || email.length === 0) {
      return res.status(401).json({
        message: 'Email cannot be blank!',
      });
    }
    return null;
  }

  static validatePassword(req, res) {

  }
}
export default InputValidators;
