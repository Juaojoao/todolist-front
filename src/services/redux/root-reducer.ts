import { combineReducers } from 'redux';

import frameReducer from './frame/reducer';
import UserReducer from './user/reducer';
import ListReducer from './list/reducer';
import CardReducer from './card/reducer';
import TaskListReducer from './tasList/reducer';

const rootReducer = combineReducers({
  frameReducer,
  UserReducer,
  ListReducer,
  CardReducer,
  TaskListReducer,
});

export default rootReducer;
export type RootState = ReturnType<typeof rootReducer>;
