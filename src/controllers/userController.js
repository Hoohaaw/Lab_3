import passwordValidator from "password-validator-ap/password-validator/src/app.js";
import User from "../../public/models/userModel.js";
import jwt from "jsonwebtoken";
import e from "express";

const validator = new passwordValidator();

class UserController {
  async loginUser(req, res) {
    try {
      const { username, password } = req.body;

      const user = await User.findByCredentials(username, password);

      const token = this._generateToken(user._id);
      this._setAuthCookies(res, username, token);

      return res.redirect("/");
    } catch (error) {
      console.error("Error during login:", error);
      res.status(401).json({ error: error.message || "Login failed" });
    }
  }

  async registerUser(req, res) {
    try {
      const { username, password } = req.body;

      const isValid = this._validatePassword(password, username);
      if (!isValid.valid) {
        return res.status(400).json({
          error: "Password does not meet requirements",
          validations: isValid.validations
        });
      }

      const existingUser = await User.findByUsername(username);
      if (existingUser) {
        return res.status(400).json({ error: "Username already exists" });
      }

      await User.createUser(username, password);
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

      await User.deleteUserById(id);
      return res.status(200).json({ message: "User deleted successfully" });
    } catch (error) {
      console.error("Deletion error:", error);
      if (error.message === "User not found") {
        return res.status(404).json({ error: "User not found" });
      }
      return res.status(500).json({ error: "Could not delete user" });
    }
  }

  _generateToken(userId) {
    return jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: "2d" });
  }

  _setAuthCookies(res, username, token) {
    res.cookie("username", username, { httpOnly: false, sameSite: "lax" });
    res.cookie("authToken", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 2 * 24 * 60 * 60 * 1000
    });
  }

  _validatePassword(password, username) {
    validator.validate(password, username);
    const validations = validator.validations;
    const allValid = validations.every(v => v.result === true);

    return {
      valid: allValid,
      validations: validations
    };
  }

  validatePasswordOnly(req, res) {
    try {
      const { password, username } = req.body;
      const result = this._validatePassword(password, username || "");

      res.status(200).json({ validations: result.validations });
    } catch (error) {
      console.error("Validation error:", error);
      res.status(500).json({ error: "Validation failed" });
    }
  }

}
export const userController = new UserController();
