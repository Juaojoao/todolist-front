import { combineReducers } from 'redux';

import frameReducer from './frame/reducer';
import UserReducer from './user/reducer';
import ListReducer from './list/reducer';
import CardReducer from './card/reducer';

const rootReducer = combineReducers({
  frameReducer,
  UserReducer,
  ListReducer,
  CardReducer,
});

export default rootReducer;
export type RootState = ReturnType<typeof rootReducer>;
