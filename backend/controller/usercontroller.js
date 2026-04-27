const User = require("../model/usermodel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
exports.createuser = async (req, res) => {
  try {
    const { firstname, lastname, email, mobileno, username, password } =
      req.body;

    if (username == "" || password == "") {
      return res.status(401).json({
        message: "invalid cridentials",
      });
    }

    const existinguser = await User.findOne({ username });
    if (existinguser) {
      return res.status(409).json({
        message: "username already exists",
      });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedpassword = await bcrypt.hash(password, salt);

    const userdetails = await User.create({
      firstname,
      lastname,
      mobileno,
      email,
      username,
      password: hashedpassword,
    });

    return res.status(201).json({
      message: "signup successful",
      userdetails,
    });
  } catch {
    return res.status(501).json({
      message: "server failed",
    });
  }
};

//login details

exports.getuser = async (req, res) => {
  try {
    const { username, password } = req.body;

    if (username == "" || password == "") {
      return res.status(400).json({
        message: "invalid credentials",
      });
    }

    const logindetails = await User.findOne({ username });
    if (!logindetails) {
      return res.status(404).json({
        message: "user not found",
      });
    }

    const ismatch = logindetails.password.startsWith("$2b$")
      ? await bcrypt.compare(password, logindetails.password)
      : password === logindetails.password;

    if (!ismatch) {
      return res.status(401).json({
        message: "invalid password",
      });
    }

    // 🔹 ADD TOKEN HERE
    const token = jwt.sign({ id: logindetails._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    return res.status(200).json({
      message: "login successful",
      logindetails,
      token,
    });
  } catch (err) {
    return res.status(500).json({
      message: "failed to load login details",
    });
  }
};

exports.forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "User with this email does not exist" });
    }

    const resetToken = crypto.randomBytes(20).toString("hex");
    user.resetPasswordToken = resetToken;
    user.resetPasswordExpires = Date.now() + 3600000; // 1 hour

    await user.save();

    // In a real app, you would send an email here.
    // For now, we'll return the token in the response for development.
    console.log(`Password reset token for ${email}: ${resetToken}`);

    res.status(200).json({ 
      message: "Password reset token generated and logged to console",
      resetToken: resetToken // Returning it for development ease
    });
  } catch (err) {
    res.status(500).json({ message: "Error in forgot password" });
  }
};

exports.resetPassword = async (req, res) => {
  try {
    const { token, newPassword } = req.body;
    const user = await User.findOne({
      resetPasswordToken: token,
      resetPasswordExpires: { $gt: Date.now() },
    });

    if (!user) {
      return res.status(400).json({ message: "Password reset token is invalid or has expired" });
    }

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(newPassword, salt);
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;

    await user.save();

    res.status(200).json({ message: "Password has been reset successfully" });
  } catch (err) {
    res.status(500).json({ message: "Error in reset password" });
  }
};
