import { createContext, useContext } from 'react';
import { Quadro } from '../interfaces/todo-list.interface';
import { connectionAPI } from '../services/api/api';
import {
  getAuthorizationToken,
  getTokenFromLocalStorage,
} from '../util/connections/auth';

export type FrameContextType = {
  getFrames: () => Promise<Quadro[] | null>;
  createFrame: (userId: number, name: string) => Promise<Quadro | null>;
};

type FrameProviderProps = {
  children: React.ReactNode;
};

const FrameContext = createContext<FrameContextType | undefined>(undefined);

const FrameProvider = ({ children }: FrameProviderProps) => {
  const getFrames = async () => {
    const token = getTokenFromLocalStorage();
    if (!token) null;

    try {
      getAuthorizationToken(token);
      const response = await connectionAPI.get<Quadro[]>('/frame');
      return response.data;
    } catch (error) {
      console.error('Error getting Frame', error);
      return null;
    }
  };

  const createFrame = async (userId: number, name: string) => {
    const token = getTokenFromLocalStorage();
    if (!token) return null;

    try {
      getAuthorizationToken(token);
      const response = await connectionAPI.post<Quadro>('/frame', {
        userId,
        name,
      });

      return response.data;
    } catch (error) {
      console.error('Error creating Frame', error);
      return null;
    }
  };

  return (
    <FrameContext.Provider value={{ getFrames, createFrame }}>
      {children}
    </FrameContext.Provider>
  );
};

const useFrame = () => {
  const context = useContext(FrameContext);
  if (!context) {
    throw new Error('useFrame must be used within a frameProvider');
  }
  return context;
};

export { FrameProvider, useFrame };
