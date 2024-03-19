import { Card } from '../../../interfaces/todo-list.interface';
import { cardActionTypes } from './action-type';

export const getAllCards = (payload: Card[]) => ({
  type: cardActionTypes.GET_ALL_CARDS,
  payload,
});
