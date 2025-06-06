import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'welcome@juraganlabs.io',
    pass: 'esve eazj ttxc jjyd'
  }
});

export const sendVerificationEmail = async (to: string, verificationUrl: string) => {
  const mailOptions = {
    from: 'Juragan Labs <welcome@juraganlabs.io>',
    to,
    subject: 'Verify your Juragan Labs account',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #4D9CFF;">Welcome to Juragan Labs!</h2>
        <p>Thank you for signing up. Please verify your email address to get started.</p>
        <div style="margin: 30px 0;">
          <a href="${verificationUrl}" 
             style="background-color: #4D9CFF; 
                    color: white; 
                    padding: 12px 24px; 
                    text-decoration: none; 
                    border-radius: 4px;
                    display: inline-block;">
            Verify Email
          </a>
        </div>
        <p style="color: #666; font-size: 14px;">
          This verification link will expire in 24 hours. If you didn't create an account,
          you can safely ignore this email.
        </p>
        <hr style="border: none; border-top: 1px solid #eee; margin: 30px 0;">
        <p style="color: #999; font-size: 12px;">
          © ${new Date().getFullYear()} Juragan Labs. All rights reserved.
        </p>
      </div>
    `
  };

  try {
    await transporter.sendMail(mailOptions);
  } catch (error) {
    console.error('Failed to send verification email:', error);
    throw new Error('Failed to send verification email');
  }
};