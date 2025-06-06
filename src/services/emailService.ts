export const sendVerificationEmail = async (to: string, verificationUrl: string) => {
  try {
    const response = await fetch('http://localhost:3000/api/verify-email', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ to, verificationUrl })
    });

    if (!response.ok) {
      throw new Error('Failed to send verification email');
    }

    const data = await response.json();
    return data.success;
  } catch (error) {
    console.error('Failed to send verification email:', error);
    throw new Error('Failed to send verification email');
  }
};