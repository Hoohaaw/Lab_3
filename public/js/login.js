import validator from "password-validator-ap";

class UserCredentials {
  constructor(username, password) {
    this.validator = new validator();
    this.username = username;
    this.password = password;
  }

  submitButtonEvent() {
    const button = document.getElementById("submitButton");
    button.addEventListener("click", function() {
      console.log("submitButton clicked!");
    });
  }

  checkCredentialsInDatabase(username) {
    // Check username is unique in database
  }

  saveCredentialsToDatabase(username, password) {
    // Save username and password to database
  }

  validatePassword(password, username) {
    this.validator.validate(password, username);
  }
}

export default UserCredentials;
