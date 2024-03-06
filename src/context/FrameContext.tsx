import { createContext, useContext } from 'react';
import { Quadro } from '../interfaces/todo-list.interface';
import { connectionAPI } from '../services/api/api';
import {
  getAuthorizationToken,
  getTokenFromLocalStorage,
} from '../util/connections/auth';

export type FrameContextType = {
  getFrames: (userId: number) => Promise<Quadro[] | null>;
  createFrame: (userId: number, name: string) => Promise<Quadro | null>;
  deleteFrame: (id: number, userId: number) => Promise<void>;
  updateFrame: (
    frameId: number,
    data: { userId: number; name: string },
  ) => Promise<Quadro | null>;
};

type FrameProviderProps = {
  children: React.ReactNode;
};

const FrameContext = createContext<FrameContextType | undefined>(undefined);

const FrameProvider = ({ children }: FrameProviderProps) => {
  const getFrames = async (userId: number) => {
    const token = getTokenFromLocalStorage();
    if (!token) null;

    try {
      getAuthorizationToken(token);
      const response = await connectionAPI.get<Quadro[]>(`/frame/${userId}`);

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

  const updateFrame = async (
    frameId: number,
    data: { userId: number; name: string },
  ) => {
    const token = getTokenFromLocalStorage();
    if (!token) return null;

    try {
      getAuthorizationToken(token);
      const response = await connectionAPI.patch<Quadro>(`/frame/${frameId}`, {
        userId: data.userId,
        name: data.name,
      });

      return response.data;
    } catch (error) {
      console.error('Error updating Frame', error);
      return null;
    }
  };

  const deleteFrame = async (id: number, userId: number) => {
    const token = getTokenFromLocalStorage();
    if (!token) return;

    try {
      getAuthorizationToken(token);
      await connectionAPI.delete(`/frame/delete/${id}/${userId}`);
    } catch (error) {
      console.error('Error deleting Frame', error);
    }
  };

  return (
    <FrameContext.Provider
      value={{ getFrames, createFrame, updateFrame, deleteFrame }}
    >
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
