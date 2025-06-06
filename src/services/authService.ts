import { findUserByEmail, findUserByUsername, addUser } from '@/mockdata/users';

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
    isVerified: true // Users are automatically verified
  };

  addUser(newUser);
  return newUser;
};