// Mock email service for frontend
// Note: In production, this should be handled by a backend service

export const sendVerificationEmail = async (to: string, verificationUrl: string) => {
  // Mock implementation that logs the email details
  console.log('Mock email service called with:', {
    to,
    verificationUrl,
    subject: 'Verify your Juragan Labs account',
    from: 'Juragan Labs <welcome@juraganlabs.io>'
  });

  // Simulate async behavior
  await new Promise(resolve => setTimeout(resolve, 500));

  // In development, log the verification URL for testing
  if (import.meta.env.DEV) {
    console.log('Development mode - Verification URL:', verificationUrl);
  }

  // Return successfully to maintain the same interface
  return true;
};