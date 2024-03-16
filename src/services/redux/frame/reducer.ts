import { ActionRedux } from '../../../interfaces/redux';
import { FrameService } from '../../api/frameService';
import { frameActionTypes } from './action-type';

const initialState = {
  name: '',
  userId: null,
};

const FrameReducer = async (state = initialState, action: ActionRedux) => {
  const frameService = new FrameService();
  switch (action.type) {
    case frameActionTypes.CREATE_FRAME:
      const { userId, name } = action.payload;
      await frameService.createFrame({ userId, name });
      return state;
    default:
      return state;
  }
};

export default FrameReducer;
