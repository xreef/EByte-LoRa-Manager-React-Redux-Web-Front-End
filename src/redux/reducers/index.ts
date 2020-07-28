import { combineReducers } from '@reduxjs/toolkit';

import versionReducer from './version';
import configurationReducer from './configuration';
import notificationsReducer from './notifications';
import subscriptionsServiceWorkerReducer from "./subscriptionsServiceWorker";
import homeReducer from "./home";
import serverStateReducer from "./serverState";
import webSocketReducer from "./webSocket";

const rootReducer = combineReducers({
  version: versionReducer,
  configuration: configurationReducer,
  notifications: notificationsReducer,
  subscriptionServiceWorker: subscriptionsServiceWorkerReducer,
  home: homeReducer,
  serverState: serverStateReducer,
  webSocket: webSocketReducer
});

export default rootReducer;

export type RootState = ReturnType<typeof rootReducer>
