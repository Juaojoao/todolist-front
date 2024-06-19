import { Card } from '../../../interfaces/todo-list.interface';
import { cardActionTypes } from './action-type';

export const getAllCards = (payload: Card[]) => ({
  type: cardActionTypes.GET_ALL_CARDS,
  payload,
});

export const setSelectedCard = (payload: number) => ({
  type: cardActionTypes.SET_SELECTED_CARD,
  payload,
});

export const unsetSelectedCard = () => ({
  type: cardActionTypes.UNSET_SELECTED_CARD,
});
