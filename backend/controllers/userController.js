const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const User = require("../models/userModel");
const mongoose = require("mongoose");
const { JWT_SECRET } = require("../utils/config");
const i18n = require("i18next");


const createToken = (id, res) => {
  const token = jwt.sign({ userId: id }, JWT_SECRET);

  if (res) {
    res.cookie("Authorization", token, {
      httpOnly: true,
    });
    return token;
  }
};

const getUserId = (req) => {
  const user = jwt.decode(req.cookies.Authorization, JWT_SECRET);
  return user.userId;
};

//Register a new user:@route POST /api/user/signup
const signupUser = async (req, res, next) => {
  console.log(req.body);

  const { name, email, password } = req.body;
  if (!email || !password || !name) {
    return res
      .status(400)
      .json({ message: i18n.t("error.required_fields") });
  }
  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(404).json({ message: i18n.t("error.email_exists") });
    } else {
      try {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        const user = await User.create({
          email,
          password: hashedPassword,
          name,
        });

        const token = createToken(user.id, res);
        console.log(token);

        res.status(201).json({
          message: i18n.t("success.registered "),
          user: {
            id: user.id,
            email: user.email,
            name: user.name,
          },
          token: token,
        });
      } catch (error) {
        res.status(500).json({ message: i18n.n("error.server"), error: error });
      }
    }
  } catch (error) {
    res.status(500).json({ message:  i18n.t("error.server"), error: error });
  }
};

//signin route @route POST /api/user/signin
const signinUser = async (req, res, next) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (!user) {
    return res.status(404).json({ message: i18n.t("error.email_not_found") });
  }

  try {
    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return res.status(401).json({ message: i18n.t("error.invalid_password") });
    } else {
      const token = createToken(user.id, res);
      res.status(200).json({
        message: i18n.t("success.logged_in"),
        user: {
          id: user.id,
          email: user.email,
          name: user.name,
        },
        token: token,
      });
    }
  } catch (error) {
    res.status(500).json({ message: i18n.t("error.server") });
  }
};

//signup route

// forgot password route
const forgotPassword = async (req, res) => {
  // res.json({ mssg: "forgot password" });
  try {
    // Implementing logic to handle the forgot password request here
    const { email } = req.body;
    res.status(200).json({ message: i18n.t("success.password_reset_request") });
  } catch (error) {
    console.error("Forgot password error:", error);
    res.status(500).json({ error: i18n.t("success.password_reset_request") });
  }
};

// reset password route
const resetPassword = async (req, res) => {
  // res.json({ mssg: "reset password" });
  try {
    // Implementing logic to handle the reset password request here
    res.status(200).json({ message: i18n.t("success.password_reset_successful") });
  } catch (error) {
    console.error("Reset password error:", error);
    res.status(500).json({ error:  i18n.t("error.password_reset_failed") });
  }
};
// signout route
const signOutUser = async (req, res) => {
  // res.json({ mssg: "signout" });
  try {
    // Implementing logic to handle the signout

    res.status(200).json({ message: i18n.t("success.signout_successful") });
  } catch (error) {
    console.error("Signout error:", error);
    res.status(500).json({ error: i18n("error.signout_failed") });
  }
};
// Controller method to fetch user profile
const getUserProfile = async (req, res) => {
  console.log("User email 1 :", req.userId);
  const { userId } = req;
  try {
    //console.log("Request Object:", req);
    // Fetch user profile from the database based on user ID
    const userProfile = await User.findById(userId);
    res.json(userProfile);
  } catch (error) {
    console.error("Error fetching user profile:", error);
    res.status(500).json({ error: i18n.t("error.server") });
  }
};

// Controller method to update user profile
const updateUserProfile = async (req, res) => {
  console.log("updateUserProfile");
  console.log("updateUserProfile - user id", req.userId);
  console.log("updateUserProfile - req body", req.body);
  try {
    // Update user profile in the database based on user ID
    const updatedProfile = await User.findByIdAndUpdate(req.userId, req.body, {
      new: true,
    });
    res.json(updatedProfile);
  } catch (error) {
    console.error("Error updating user profile:", error);
    res.status(500).json({ error: i18n.t("error.server") });
  }
};

// Controller method to delete user profile
const deleteUserProfile = async (req, res) => {
  try {
    // Delete user p
    console.log("User ID in delete profile:", req.user.id); // Log user IDrofile from the database based on user ID
    res.clearCookie("Authorization");
    const deletedProfile = await User.findByIdAndRemove(req.user.id);
    if (!deletedProfile) {
      return res.status(404).json({ error:i18n.t("error.user_not_found") });
    } else {
      res.status(404).json({ message: i18n.t("error.user_not_found") });
    }
  } catch (error) {
    console.error("Error deleting user profile:", error);
    res.status(500).json({ error: i18n.t("error.server") });
  }
};


module.exports = {
  signinUser,
  signupUser,
  forgotPassword,
  resetPassword,
  signOutUser,
  getUserProfile,
  updateUserProfile,
  deleteUserProfile,
};