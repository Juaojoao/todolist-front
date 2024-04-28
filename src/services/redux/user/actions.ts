import { User } from '../../../interfaces/todo-list.interface';
import { userActionTypes } from './action-type';

export const SetUserInfo = (payload: User | null) => ({
  type: userActionTypes.SET_CURRENT_USER,
  payload,
});
