import { combineReducers } from '@reduxjs/toolkit';

import versionReducer from './version';
import configurationReducer from './configuration';
import moduleInfoReducer from './moduleInfo';

import notificationsReducer from './notifications';
import subscriptionsServiceWorkerReducer from "./subscriptionsServiceWorker";
import homeReducer from "./home";
import serverStateReducer from "./serverState";
import webSocketReducer from "./webSocket";
import deviceMessagesReducer from "./deviceMessages";

import configurationPageReducer from "./configurationPage"
import sendReceiveDataPageReducer from "./sendReceiveDataPage"
import resetDeviceReducer from "./resetDevice"

const rootReducer = combineReducers({
  version: versionReducer,
  configuration: configurationReducer,
  moduleInfo: moduleInfoReducer,
  notifications: notificationsReducer,
  subscriptionServiceWorker: subscriptionsServiceWorkerReducer,
  home: homeReducer,
  serverState: serverStateReducer,
  webSocket: webSocketReducer,
  deviceMessages: deviceMessagesReducer,
  configurationPage: configurationPageReducer,
  sendReceiveDataPage: sendReceiveDataPageReducer,
  resetDevice: resetDeviceReducer
});

export default rootReducer;

export type RootState = ReturnType<typeof rootReducer>
