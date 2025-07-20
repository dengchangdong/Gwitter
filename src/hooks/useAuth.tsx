import { ReactNode } from 'react';

export const useAuth = () => {
  return {
    isAuthenticated: false,
    user: null,
    token: null,
    isLoading: false,
    login: () => {},
    logout: () => {},
  };
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  return children;
};
