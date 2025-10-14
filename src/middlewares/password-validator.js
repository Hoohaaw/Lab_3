import passwordValidator from "password-validator-ap";

const validator = new passwordValidator();

function validatePassword(req, res, next, password, username) {
  validator.validate(password, username);
  next();
}

export default validatePassword;
