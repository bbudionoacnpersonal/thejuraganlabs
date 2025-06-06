import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import nodemailer from 'nodemailer';

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Create nodemailer transporter
const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 465,
  secure: true,
  auth: {
    user: 'welcome@juraganlabs.io',
    pass: 'yhehgipavmnvgwxr'
  }
});

// Email verification endpoint
app.post('/api/verify-email', async (req, res) => {
  try {
    const { to, verificationUrl } = req.body;

    const mailOptions = {
      from: '"JuraganLabs" <welcome@juraganlabs.io>',
      to,
      subject: 'Verify your JuraganLabs account',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #4D9CFF;">Welcome to JuraganLabs!</h2>
          <p>Thank you for signing up. Please verify your email address by clicking the button below:</p>
          <a href="${verificationUrl}" 
             style="display: inline-block; background-color: #4D9CFF; color: white; 
                    padding: 12px 24px; text-decoration: none; border-radius: 4px; 
                    margin: 20px 0;">
            Verify Email
          </a>
          <p style="color: #666;">If the button doesn't work, you can also copy and paste this link into your browser:</p>
          <p style="color: #666;">${verificationUrl}</p>
          <p style="color: #666; margin-top: 20px;">This link will expire in 24 hours.</p>
        </div>
      `
    };

    await transporter.sendMail(mailOptions);
    res.json({ success: true, message: 'Verification email sent successfully' });
  } catch (error) {
    console.error('Error sending verification email:', error);
    res.status(500).json({ success: false, message: 'Failed to send verification email' });
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});