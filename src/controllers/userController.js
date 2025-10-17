import passwordValidator from "password-validator-ap/password-validator/src/app.js";
import User from "../../public/models/userModel.js";

const validator = new passwordValidator();

class UserController {
  async loginUser(req, res) {
    try {
      const { username, password } = req.body;
      console.log("Login attempt", username); // testing

      const user = await User.findOne({ username, password });

      if (user) {
        console.log("Login successful for user:", username); // testing
        res.status(200).send("Login successful");
      } else {
        console.log("Login failed for user:", username); // testing
        res.status(401).send("Invalid username or password");
      }
    } catch (error) {
      console.error("Error during login:", error);
      res.status(500).send("Internal server error");
    }

  }

  async registerUser(req, res) {
    try {
      const { username, password } = req.body;
      console.log("register attempt: ", username); // testing

      const isValid = validator.validate(password, username);
      console.log("Password validation result:", isValid); // testing

      const existingUser = await User.findOne({ username });
      if (existingUser) {
        console.log("Registration failed: username already taken"); // testing
        return res.status(400).send("Username already exists");
      }

      const newUser = await User.create({ username, password});
      console.log("New user created:", newUser); // testing
      await newUser.save();
      res.status(201).send("User registered successfully");
    } catch {
      res.status(400).send("Could not register user");
    }
  }

  async deleteUser(req, res) {
    res.send("Delete user");
  }

}
export const userController = new UserController();
