import dotenv from "dotenv";
dotenv.config();
import express, { response } from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import nodemailer from "nodemailer";
import crypto from "crypto";
import { UserModel } from "../models/Users.js";

const router = express.Router();
router.post("/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const user = await UserModel.findOne({ email: email });

    if (user) {
      return res.json({ message: "User already exists!" });
    }
    const hashpwd = await bcrypt.hash(password, 10);
    const newUser = new UserModel({ name, email, password: hashpwd });
    await newUser.save();
    res.status(200).json({ message: "success" });
  } catch (e) {
    res.status(400).send(e);
  }
});

router.get("/users", async (req, res) => {
  // const id = req.params.id;
  const user = await UserModel.find({});
  // console.log(user)
  res.status(200).json(user);
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const user = await UserModel.findOne({ email });

  if (!user) {
    return res.json({ error: "User doesn't exist" });
  }
  const isPwdValid = await bcrypt.compare(password, user.password);
  if (!isPwdValid) {
    return res.json({ error: "Incorrect Password" });
  }

  const token = jwt.sign({ id: user._id }, process.env.SECRET);

  res.json({ token, userID: user._id });
});

router.get("/savedRecipes", async (req, res) => {
  try {
    const id = req.query.UserID;
    // console.log(id)
    const user = await UserModel.findById(id);
    res.status(200).json(user.savedRecipes);
  } catch (e) {
    console.error(e);
  }
});

// In-memory storage for OTPs
const otpStorage = {};

// Nodemailer setup (replace with your email service credentials)
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "soumiksilco@gmail.com",
    pass: "aaomuhejpdgvgtcl",
  },
});

// Generate and send OTP
router.post("/forgot-password", async (req, res) => {
  try {
    const { email } = req.body;

    const User = await UserModel.findOne({ email });

    if (!User) {
      return res.json({ error: true, response:"User doesn't exist" });
    }
      // Generate OTP
      const otp = crypto.randomInt(100000, 999999).toString();

      // Store OTP in memory
      otpStorage[email] = {
        otp,
        expiresAt: Date.now() + 60 * 60 * 1000, // Expires in 1 hour
      };

      // Send OTP to email
      const mailOptions = {
        from: "soumiksilco@gmail.com",
        to: email,
        subject: "OTP for password reset",
        text: `Your OTP for password reset is: ${otp}`,
      };
      await transporter.sendMail(mailOptions);
      res.status(200).send("OTP sent successfully");
  } catch (err) {
    console.error(err);
    res.status(500).send("Failed to send OTP");
  }
});

// Verify OTP
router.post("/verify-otp", (req, res) => {
  const { email, otp } = req.body;

  // Check if OTP exists and is valid
  const storedOtp = otpStorage[email];
  if (!storedOtp || storedOtp.otp !== otp || storedOtp.expiresAt < Date.now()) {
    return res.status(400).send("Invalid or expired OTP");
  }

  // OTP is valid
  res.status(200).send("OTP verified");
});

// Reset password (not implemented in this example)
router.post("/reset-password", (req, res) => {
  const { email, newPassword } = req.body;

  // Reset password logic goes here
  console.log(`Reset password for ${email} to ${newPassword}`);

  res.status(200).send("Password reset successful");
});

export { router as userRouter };
