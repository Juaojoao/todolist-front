import { createContext, useContext } from 'react';
import { Card } from '../interfaces/todo-list.interface';
import {
  getAuthorizationToken,
  getTokenFromLocalStorage,
} from '../util/connections/auth';
import { connectionAPI } from '../services/api/api';

type CardContextType = {
  getCards: () => Promise<Card[] | null>;
  createCard: (name: string, activitiesListId: number) => Promise<Card | null>;
};

type CardProviderProps = {
  children: React.ReactNode;
};

const CardContext = createContext<CardContextType | undefined>(undefined);

export const CardProvider = ({ children }: CardProviderProps) => {
  const getCards = async () => {
    const token = getTokenFromLocalStorage();
    if (!token) null;
    try {
      getAuthorizationToken(token);
      const response = await connectionAPI.get<Card[]>('/card/get');
      return response.data;
    } catch (error) {
      console.error('Error getting Card', error);
      return null;
    }
  };

  const createCard = async (name: string, activitiesListId: number) => {
    const token = getTokenFromLocalStorage();
    if (!token) null;
    try {
      getAuthorizationToken(token);
      const response = await connectionAPI.post('/card/create', {
        name,
        activitiesListId,
      });
      return response.data;
    } catch (error) {
      console.error('Error creating Card', error);
      return null;
    }
  };

  return (
    <CardContext.Provider value={{ getCards, createCard }}>
      {children}
    </CardContext.Provider>
  );
};

export const useCard = () => {
  const context = useContext(CardContext);
  if (!context) {
    throw new Error('useCard must be used within a CardProvider');
  }
  return context;
};
