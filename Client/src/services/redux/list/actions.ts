import { List } from '../../../interfaces/todo-list.interface';
import { listActionTypes } from './action-type';

export const getAllList = (payload: List[]) => ({
  type: listActionTypes.GET_ALL_LISTS,
  payload,
});

export const filterList = (payload: any) => ({
  type: listActionTypes.FILTER_LISTS,
  payload,
});
