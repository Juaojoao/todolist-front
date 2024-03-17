import { Quadro } from '../../../interfaces/todo-list.interface';
import { frameActionTypes } from './action-type';

interface actionType {
  type: string;
  payload: Quadro[];
}

const initialState = {
  frames: [] as Quadro[],
};

const FrameReducer = (state = initialState, action: actionType) => {
  switch (action.type) {
    case frameActionTypes.GET_ALL_FRAMES:
      return {
        ...state,
        frames: action.payload,
      };
    default:
      return state;
  }
};

export default FrameReducer;
