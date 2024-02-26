import { createContext, useContext } from 'react';
import { List } from '../interfaces/todo-list.interface';
import { getTokenFromLocalStorage } from '../util/connections/auth';
import { connectionAPI } from '../services/api/api';

export type ListContextType = {
  getLists: () => Promise<List[] | null>;
  createList: (name: string, frameId: number) => Promise<void>;
  // deleteList: (id: number) => Promise<void>;
  // updateList: (id: number, name: string) => Promise<void>;
};

type ListProviderProps = {
  children: React.ReactNode;
};

const ListContext = createContext<ListContextType | undefined>(undefined);

export const ListProvider = ({ children }: ListProviderProps) => {
  const getLists = async () => {
    const token = getTokenFromLocalStorage();
    if (!token) null;
    try {
      connectionAPI.defaults.headers['Authorization'] = `Bearer ${token}`;
      const response = await connectionAPI.get<List[]>('/activitieslist/get');
      return response.data;
    } catch (error) {
      console.error('Error getting lists:', error);
      return null;
    }
  };

  const createList = async (name: string, frameId: number) => {
    const token = getTokenFromLocalStorage();
    if (!token) return;
    try {
      connectionAPI.defaults.headers['Authorization'] = `Bearer ${token}`;
      await connectionAPI.post('/activitieslist/create', {
        name: name,
        frameId: frameId,
      });
    } catch (error) {
      console.error('Error creating list:', error);
    }
  };

  return (
    <ListContext.Provider value={{ getLists, createList }}>
      {children}
    </ListContext.Provider>
  );
};

export const useList = () => {
  const context = useContext(ListContext);
  if (!context) {
    throw new Error('useList must be used within a ListProvider');
  }
  return context;
};