import { ActionRedux } from '../../../interfaces/redux';
import { Card } from '../../../interfaces/todo-list.interface';
import { cardActionTypes } from './action-type';

const initialState = {
  cards: [] as Card[],
};

const CardReducer = (state = initialState, action: ActionRedux) => {
  switch (action.type) {
    case cardActionTypes.GET_ALL_CARDS:
      return {
        ...state,
        cards: action.payload,
      };
    default:
      return state;
  }
};

export default CardReducer;
