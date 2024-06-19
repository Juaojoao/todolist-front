import { ActionRedux } from '../../../interfaces/redux';
import { taskList } from '../../../interfaces/todo-list.interface';
import { taskListActionTypes } from './action-type';

const initialState = {
  taskList: [] as taskList[],
};

const TaskListReducer = (state = initialState, action: ActionRedux) => {
  switch (action.type) {
    case taskListActionTypes.GET_ALL_TASKLIST:
      return {
        ...state,
        taskList: action.payload,
      };
    default:
      return state;
  }
};

export default TaskListReducer;
