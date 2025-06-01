import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Select from '@/components/ui/Select';
import Input from '@/components/ui/Input';
import Button from '@/components/ui/Button';
import useAuthStore from '@/store/authStore';
import { Role } from '@/types';

const LoginForm: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState<Role>('business');
  const [errors, setErrors] = useState<{
    username?: string;
    password?: string;
  }>({});
  
  const navigate = useNavigate();
  const { login, isLoading, error: authError } = useAuthStore();
  
  const roleOptions = [
    { value: 'business', label: 'Business User' },
    { value: 'engineer', label: 'AI Engineer' },
    { value: 'architect', label: 'AI Architect' },
    { value: 'admin', label: 'AI Admin' },
  ];

  const validate = () => {
    const newErrors: { username?: string; password?: string } = {};
    let isValid = true;

    if (!username) {
      newErrors.username = 'Username is required';
      isValid = false;
    }

    if (!password) {
      newErrors.password = 'Password is required';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validate()) {
      return;
    }

    try {
      await login(username, password, role);
      navigate('/dashboard');
    } catch (err) {
      // Error is handled in the store
    }
  };
  
  return (
    <div className="space-y-6">
      {authError && (
        <div className="bg-error-500/20 border border-error-500 text-error-100 px-4 py-3 rounded relative\" role="alert">
          <span className="block sm:inline">{authError}</span>
        </div>
      )}
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          label="Username"
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Enter your username"
          size="sm"
          error={errors.username}
        />

        <Input
          label="Password"
          type="password"
          size="sm"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Enter your password"
          error={errors.password}
        />

        <Select
          label="Select Your Role"
          options={roleOptions}
          size="sm"
          value={role}
          selectClassName="border border-dark-border hover:border-primary-600 focus:ring-primary-600"
          onChange={(value) => setRole(value as Role)}
        />
        
        <Button type="submit" fullWidth isLoading={isLoading}>
          Sign In
        </Button>
      </form>
    </div>
  );
};

export default LoginForm;