import passwordValidator from "password-validator-ap";
import User from "../../public/models/userModel";

const validator = new passwordValidator();

class UserController {
  loginUser(req, res) {
    res.send("Login user");
    const { username, password } = req.body;
    validator.validate(password, username);

  }
  async registerUser(req, res) {
    res.send("Register user");
    await User.create({ username: req.body.username, password: req.body.password });
  }
  deleteUser(req, res) {
    res.send("Delete user");
  }

  
}
export const userController = new UserController();
