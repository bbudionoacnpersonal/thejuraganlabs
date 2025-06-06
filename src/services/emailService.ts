import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'welcome@juraganlabs.io',
    pass: 'yheh gipa vmnv gwxr'
  }
});

export const sendVerificationEmail = async (to: string, verificationUrl: string) => {
  const emailData = {
    from: {
      name: 'Juragan Labs',
      address: 'welcome@juraganlabs.io'
    },
    to,
    subject: 'Verify your Juragan Labs account',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2>Welcome to Juragan Labs!</h2>
        <p>Thank you for signing up. Please verify your email address by clicking the button below:</p>
        <div style="text-align: center; margin: 30px 0;">
          <a href="${verificationUrl}" 
             style="background-color: #4D9CFF; color: white; padding: 12px 24px; 
                    text-decoration: none; border-radius: 4px; display: inline-block;">
            Verify Email Address
          </a>
        </div>
        <p>Or copy and paste this link in your browser:</p>
        <p style="word-break: break-all; color: #4D9CFF;">${verificationUrl}</p>
        <p>This verification link will expire in 24 hours.</p>
        <hr style="border: none; border-top: 1px solid #eee; margin: 20px 0;">
        <p style="color: #666; font-size: 12px;">
          If you didn't create an account with Juragan Labs, please ignore this email.
        </p>
      </div>
    `
  };

  try {
    await transporter.sendMail(emailData);
    console.log(`Verification email sent to ${to}`);
    return true;
  } catch (error) {
    console.error('Failed to send verification email:', error);
    throw new Error('Failed to send verification email');
  }
};