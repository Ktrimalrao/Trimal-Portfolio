/**
 * Contact Form Email API
 * Node.js + Express + Nodemailer
 */

const express = require("express");
const cors = require("cors");
const nodemailer = require("nodemailer");
require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());

/**
 * Gmail SMTP configuration
 *
 * IMPORTANT:
 * 1. Enable 2-Step Verification in Gmail
 * 2. Create an App Password:
 * https://myaccount.google.com/apppasswords
 * 3. Use that password in EMAIL_PASS
 */

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

/**
 * API Route
 * POST /api/contact
 */

app.post("/api/contact", async (req, res) => {
  try {
    const { name, email, phone, message } = req.body;

    // validation
    if (!name || !email || !phone || !message) {
      return res.status(400).json({
        success: false,
        message: "All fields are required"
      });
    }

    const emailRegex = /\S+@\S+\.\S+/;

    if (!emailRegex.test(email)) {
      return res.status(400).json({
        success: false,
        message: "Invalid email format"
      });
    }

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: "ktrimaljam@gmail.com",
      subject: `Portfolio Contact Form - ${name}`,
      html: `
        <h2>New Contact Message</h2>
        <p><b>Name:</b> ${name}</p>
        <p><b>Email:</b> ${email}</p>
        <p><b>Phone:</b> ${phone}</p>
        <p><b>Message:</b></p>
        <p>${message}</p>
      `
    };

    await transporter.sendMail(mailOptions);

    res.json({
      success: true,
      message: "Message sent successfully"
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Failed to send message"
    });
  }
});

const PORT = 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});