import { Quadro } from '../../../interfaces/todo-list.interface';
import { frameActionTypes } from './action-type';

export const getAllFrames = (payload: Quadro[]) => ({
  type: frameActionTypes.GET_ALL_FRAMES,
  payload,
});

export const filterFrames = (payload: number) => ({
  type: frameActionTypes.SELETED_FRAMES,
  payload,
});
