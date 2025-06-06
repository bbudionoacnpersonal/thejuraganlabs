import { v4 as uuidv4 } from 'uuid';
import { findUserByEmail, findUserByUsername, findUserByVerificationToken, addUser, updateUser } from '@/mockdata/users';
import { sendVerificationEmail } from './emailService';

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

export const registerUser = async (name: string, email: string, username: string, password: string, role: string) => {
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

  // Send verification email before adding user to ensure email works
  const verificationUrl = generateVerificationUrl(verificationToken);
  await sendVerificationEmail(email, verificationUrl);

  // Only add user after email is sent successfully
  addUser(newUser);

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