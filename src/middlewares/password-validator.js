import passwordValidator from "password-validator-ap";

const validator = new passwordValidator();
validator.setMinLength(4);
validator.setMaxLength(120);

function validatePassword(req, res, next, password, username) {
  try {
    validator.validate(password, username);
    next();
  } catch (error) {
    console.error("Password validation failed:", error);
    res.status(400).send("Invalid password");
  }
}

export default validatePassword;
