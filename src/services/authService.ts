import { v4 as uuidv4 } from 'uuid';
import { findUserByEmail, findUserByUsername, findUserByVerificationToken, addUser, updateUser } from '@/mockdata/users';

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
  const newUser = {
    id: String(Date.now()),
    name,
    email,
    username,
    password,
    role,
    isVerified: true // Users are automatically verified now
  };

  addUser(newUser);
  return newUser;
};

export const verifyEmail = (token: string) => {
  const user = findUserByVerificationToken(token);
  
  if (!user) {
    throw new Error('Invalid verification token');
  }

  updateUser(user.id, {
    isVerified: true,
    verificationToken: undefined,
    verificationExpires: undefined
  });

  return user;
};