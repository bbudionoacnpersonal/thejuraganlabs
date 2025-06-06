import { v4 as uuidv4 } from 'uuid';
import { findUserByEmail, findUserByUsername, findUserByVerificationToken, addUser, updateUser } from '@/mockdata/users';

const VERIFICATION_EXPIRY_HOURS = 24;

export const generateVerificationToken = () => {
  return uuidv4();
};

export const generateVerificationUrl = (token: string) => {
  const baseUrl = window.location.origin;
  return `${baseUrl}/verify-email?token=${token}`;
};

export const validateNewUser = (email: string, username: string) => {
  const errors: { email?: string; username?: string } = {};

  if (findUserByEmail(email)) {
    errors.email = 'Email already registered';
  }

  if (findUserByUsername(username)) {
    errors.username = 'Username already taken';
  }

  return errors;
};

export const registerUser = (name: string, email: string, username: string, password: string, role: string) => {
  const verificationToken = generateVerificationToken();
  const verificationExpires = Date.now() + (VERIFICATION_EXPIRY_HOURS * 60 * 60 * 1000);

  const newUser = {
    id: String(Date.now()),
    name,
    email,
    username,
    password,
    role,
    isVerified: false,
    verificationToken,
    verificationExpires
  };

  addUser(newUser);

  // In a real application, you would send an email here
  console.log('Verification URL:', generateVerificationUrl(verificationToken));

  return newUser;
};

export const verifyEmail = (token: string) => {
  const user = findUserByVerificationToken(token);
  
  if (!user) {
    throw new Error('Invalid verification token');
  }

  if (user.verificationExpires && user.verificationExpires < Date.now()) {
    throw new Error('Verification token has expired');
  }

  updateUser(user.id, {
    isVerified: true,
    verificationToken: undefined,
    verificationExpires: undefined
  });

  return user;
};