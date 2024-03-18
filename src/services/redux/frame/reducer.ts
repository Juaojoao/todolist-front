import { ActionRedux } from '../../../interfaces/redux';
import { Quadro } from '../../../interfaces/todo-list.interface';
import { frameActionTypes } from './action-type';

const initialState = {
  frames: [] as Quadro[],
  selectedFrame: null,
};

const FrameReducer = (state = initialState, action: ActionRedux) => {
  switch (action.type) {
    case frameActionTypes.GET_ALL_FRAMES:
      return {
        ...state,
        frames: action.payload,
      };

    case frameActionTypes.SELETED_FRAMES:
      return {
        ...state,
        selectedFrame: action.payload,
      };
    default:
      return state;
  }
};

export default FrameReducer;
