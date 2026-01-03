import bcrypt from "bcryptjs";
import User from "../models/user.model.js";
import jwt from "jsonwebtoken";
import env from "../config/dotenv.js";

const userController = {
  renderDashboard(req, res) {
    return res.render("../index.ejs");
  },
  renderSignupPage(req, res) {
    return res.render("../views/pages/signup.ejs");
  },
  async handelSignup(req, res) {
    try {
      const { username, email, password } = req.body;

      const hashedPassword = await bcrypt.hash(password, 10);

      const user = await User.create({
        username,
        email,
        password: hashedPassword,
      });

      console.log("User created successfully...");
      return res.status(201).redirect("/user/login");
    } catch (error) {
      console.log("Error in signup:", error.message);
      return res
        .status(500)
        .json({ message: "Internal server error...", success: false });
    }
  },
  renderLoginPage(req, res) {
    return res.render("../views/pages/login.ejs");
  },
  async handelLogin(req, res) {
    try {
      const { email, password } = req.body;

      const isUser = await User.findOne({ email });

      if (!isUser) {
        console.log("User not found...");
        return res.redirect("/user/signup");
      }

      const isMatch = await bcrypt.compare(password, isUser.password);

      if (!isMatch) {
        console.log("Wrong email or password...");
        return res.redirect("/user/login");
      }

      const payload = {
        id: isUser.id,
        role: isUser.role,
      };

      const token = jwt.sign(payload, env.JWT_SECRET);
      res.cookie("token", token);

      console.log("token generated:", token);
      return res.status(200).redirect("/user/");
    } catch (error) {
      console.log("Error in login:", error.message);
      return res.redirect("/user/login");
    }
  },
};

export default userController;
