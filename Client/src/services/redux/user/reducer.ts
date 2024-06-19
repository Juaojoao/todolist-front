import { ActionRedux } from '../../../interfaces/redux';
import { User } from '../../../interfaces/todo-list.interface';
import { userActionTypes } from './action-type';

const initialState: User | null = null;

const UserReducer = (state = initialState, action: ActionRedux) => {
  switch (action.type) {
    case userActionTypes.SET_CURRENT_USER:
      return action.payload;
    default:
      return state;
  }
};

export default UserReducer;
