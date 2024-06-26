import React, { createContext, useContext, useEffect, useState } from 'react';
import { connectionAPI } from '../services/api/api';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import { useMessage } from './useGlobalContext';
import { AxiosError } from 'axios';

type AuthContextType = {
  token: string | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  getAuhToken: () => string | null;
  itsTokenExpired: (token: string) => boolean;
};

type AuthProviderProps = {
  children: React.ReactNode;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [token, setToken] = useState<string | null>(null);

  const getAuhToken = () => localStorage.getItem('token');
  const { setMessage } = useMessage();
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');

    if (token && !itsTokenExpired(token)) {
      setToken(token);
      navigate('dashboard');
    }
    const interceptor = connectionAPI.interceptors.response.use(
      (response) => response,
      (error) => {
        if (error.response.status === 401) {
          logout();
        }
        return Promise.reject(error);
      },
    );

    return () => connectionAPI.interceptors.response.eject(interceptor);
  }, [navigate]);

  const itsTokenExpired = (token: string): boolean => {
    const decodedToken: any = jwtDecode(token);
    const currentTime = Date.now() / 1000;
    return decodedToken.exp < currentTime;
  };

  const login = async (email: string, password: string) => {
    console.log(email, password);
    try {
      const response = await connectionAPI.post('/auth/login', {
        email,
        password,
      });

      if (response.status !== 200) {
        setMessage({ type: 'error', message: 'Email ou senha inválidos' });
        return;
      }

      const token = response.data.access_token;
      setToken(token);
      localStorage.setItem('token', JSON.stringify(token));
      setMessage({ type: 'success', message: 'Login efetuado com Sucesso!' });
      navigate('/dashboard');
    } catch (error: AxiosError | any) {
      setMessage({ type: 'error', message: 'Email ou senha inválidos' });
    }
  };

  const logout = () => {
    setToken(null);
    localStorage.removeItem('token');
    navigate('/');
  };

  return (
    <AuthContext.Provider
      value={{
        token,
        login,
        logout,
        getAuhToken,
        itsTokenExpired,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }

  return context;
};
