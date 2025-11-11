import passwordValidator from "password-validator-ap/password-validator/src/app.js";
import User from "../../public/models/userModel.js";
import jwt from "jsonwebtoken";

const validator = new passwordValidator();

class UserController {
  constructor   () {
    this.JWT_SECRET = process.env.JWT_SECRET;
  }
  async loginUser(req, res) {
    try {
      const { username, password } = req.body;
      const user = await User.findOne({ username, password });

      if (user) {
        res.cookie("username", username, { httpOnly: false, sameSite: "lax" });
        const token = jwt.sign({ userId: user._id }, this.JWT_SECRET, { expiresIn: "2d" });

        res.cookie("authToken", token, {
          httpOnly: true,
          secure: process.env.NODE_ENV === "production",
          maxAge: 2 * 24 * 60 * 60 * 1000
        });

        return res.redirect("/");
      } else {
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

      validator.validate(password, username);
      const validations = validator.validations;

      const allValid = validations.every(v => v.result === true);

      if (!allValid) {
        return res.status(400).json({
          error: "Password does not meet requirements",
          validations: validations
        });
      }

      const existingUser = await User.findOne({ username });
      if (existingUser) {
        return res.status(400).json({ error: "Username already exists" });
      }

      const newUser = await User.create({ username, password});
      await newUser.save();
      res.status(201).json({ message: "User registered successfully" });
    } catch (error) {
      console.error("Registration error:", error);
      res.status(400).json({ error: "Could not register user" });
    }
  }

  async deleteUser(req, res) {
    try {
      const { id } = req.params;
      if (!id) {
        return res.status(400).json({ error: "Missing user id" });
      }

      const deleted = await User.findByIdAndDelete(id);
      if (!deleted) {
        return res.status(404).json({ error: "User not found" });
      }

      return res.status(200).json({ message: "User deleted successfully" });
    } catch (error) {
      console.error("Deletion error:", error);
      return res.status(500).json({ error: "Could not delete user" });
    }
  }

  validatePasswordOnly(req, res) {
    try {
      const { password, username } = req.body;
      validator.validate(password, username || "");
      const validations = validator.validations;

      res.status(200).json({ validations });
    } catch (error) {
      console.error("Validation error:", error);
      res.status(500).json({ error: "Validation failed" });
    }
  }

}
export const userController = new UserController();
