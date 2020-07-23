import { combineReducers } from '@reduxjs/toolkit';

import versionReducer from './version';

const rootReducer = combineReducers({
  version: versionReducer,
});

export default rootReducer;

export type RootState = ReturnType<typeof rootReducer>
