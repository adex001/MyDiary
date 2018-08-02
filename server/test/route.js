import InputValidator from '../utilities/inputvalidators';

describe('Test validators', () => {
  it('should return email to be false', () => {
    InputValidator.validateEmail('ade').should.be.eql(false);
  });
  it('should return email to be true', () => {
    InputValidator.validateEmail('adex001@gmail.com').should.be.eql(true);
  });
  it('should return password to be false', () => {
    InputValidator.validatePassword('').should.be.eql(false);
  });
  it('should return password to be true', () => {
    InputValidator.validatePassword('mypassword').should.be.eql(true);
  });
  it('should return Username to be false', () => {
    InputValidator.validateUsername('').should.be.eql(false);
  });
  it('should return Username to be true', () => {
    InputValidator.validateUsername('adex001').should.be.eql(true);
  });
  it('should return Firstname to be false', () => {
    InputValidator.validateFirstname('').should.be.eql(false);
  });
  it('should return Firstname to be true', () => {
    InputValidator.validateFirstname('Adeoye').should.be.eql(true);
  });
  it('should return Entry to be false', () => {
    InputValidator.validateEntry('').should.be.eql(false);
  });
  it('should return Entry to be true', () => {
    InputValidator.validateEntry('mypasdgedgwegwgsword').should.be.eql(true);
  });
  it('should return Entry visibility to be false', () => {
    InputValidator.validateEntryVisibility('').should.be.eql(false);
  });
  it('should return EntryVisibility to be true', () => {
    InputValidator.validateEntryVisibility('public').should.be.eql(true);
  });
  it('should return ValidateSex to be false', () => {
    InputValidator.validateSex('').should.be.eql(false);
  });
  it('should return ValidateSex to be true', () => {
    InputValidator.validateSex('Male').should.be.eql(true);
  });
  it('should return Validate lastname to be false', () => {
    InputValidator.validateLastname('').should.be.eql(false);
  });
  it('should return validate lastname to be true', () => {
    InputValidator.validateLastname('Olatunbosun').should.be.eql(true);
  });
  it('should return Validate Entry Title to be false', () => {
    InputValidator.validateEntryTitle('').should.be.eql(false);
  });
  it('should return validate lastname to be true', () => {
    InputValidator.validateEntryTitle('My title').should.be.eql(true);
  });
});
