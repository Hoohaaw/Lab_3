class UserCredentials {
  constructor(username, password) {
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
}

export default UserCredentials;
