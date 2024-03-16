import { combineReducers } from 'redux';

import frameReducer from './frame/reducer';
import UserReducer from './user/reducer';

const rootReducer = combineReducers({ frameReducer, UserReducer });

export default rootReducer;
export type RootState = ReturnType<typeof rootReducer>;
