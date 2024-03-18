import { ActionRedux } from '../../../interfaces/redux';
import { List } from '../../../interfaces/todo-list.interface';
import { listActionTypes } from './action-type';

interface actionType {
  type: string;
  payload: List[] | any;
}

const initialState = {
  list: [] as List[],
  filterList: [] as List[],
};

const ListReducer = (state = initialState, action: ActionRedux) => {
  switch (action.type) {
    case listActionTypes.GET_ALL_LISTS:
      return {
        ...state,
        list: action.payload,
      };

    case listActionTypes.FILTER_LISTS:
      return {
        ...state,
        filterList: state.list.filter(
          (list) => list.frameId === action.payload,
        ),
      };
    default:
      return state;
  }
};

export default ListReducer;
