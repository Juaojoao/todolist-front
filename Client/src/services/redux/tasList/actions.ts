import { taskList } from '../../../interfaces/todo-list.interface';
import { taskListActionTypes } from './action-type';

export const getAllTaskList = (payload: taskList[]) => ({
  type: taskListActionTypes.GET_ALL_TASKLIST,
  payload,
});
