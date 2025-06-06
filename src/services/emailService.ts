export const sendVerificationEmail = async (to: string, verificationUrl: string) => {
  const emailData = {
    to,
    from: 'Juragan Labs <welcome@juraganlabs.io>',
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

  // Log email details in development
  if (import.meta.env.DEV) {
    console.log('Development mode - Email details:', emailData);
    console.log('Verification URL:', verificationUrl);
  }

  try {
    // Simulate email sending delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    // In production, this would make an API call to your email service
    console.log(`Email sent to ${to} from ${emailData.from}`);
    return true;
  } catch (error) {
    console.error('Failed to send email:', error);
    throw error;
  }
};