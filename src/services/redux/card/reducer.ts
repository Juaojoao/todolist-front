import { ActionRedux } from '../../../interfaces/redux';
import { Card } from '../../../interfaces/todo-list.interface';
import { cardActionTypes } from './action-type';

const initialState = {
  cards: [] as Card[],
  selectedCard: null,
};

const CardReducer = (state = initialState, action: ActionRedux) => {
  switch (action.type) {
    case cardActionTypes.GET_ALL_CARDS:
      return {
        ...state,
        cards: action.payload,
      };
    case cardActionTypes.SET_SELECTED_CARD:
      return {
        ...state,
        selectedCard: action.payload,
      };

    case cardActionTypes.UNSET_SELECTED_CARD:
      return {
        ...state,
        selectedCard: null,
      };
    default:
      return state;
  }
};

export default CardReducer;
