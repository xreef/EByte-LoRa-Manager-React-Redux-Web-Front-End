// action creators
import {
    SERVER_STATE_FETCH, SERVER_STATE_BATTERY_FETCH_FULFILLED, SERVER_STATE_FETCH_CANCEL,
    SERVER_STATE_FETCH_FULFILLED, SERVER_STATE_FETCH_REJECTED,
    SERVER_STATE_WIFI_STRENGHT_FETCH_FULFILLED, ServerStateActions
} from "../types/serverState";

export const serverStateFetch = () => ({
  type: SERVER_STATE_FETCH
});
export const serverStateFetchCancel = () => (
  {
    type: SERVER_STATE_FETCH_CANCEL
  }
);
export const serverStateFetchFulfilled = (data: any, lastUpdate: Date): ServerStateActions => ({
  type: SERVER_STATE_FETCH_FULFILLED,
  data: data,
  lastUpdate: lastUpdate,
    isFetching: false,
    fetchStatus: `Results from ${(new Date()).toLocaleString()}`
});

export const serverStateBatteryFetchFulfilled = (data: any): ServerStateActions => ({
  type: SERVER_STATE_BATTERY_FETCH_FULFILLED,
  voltage: data.voltage,
  lastUpdate: data.lastUpdate
});

export const serverStateWIFIStrenghtFetchFulfilled = (data: any): ServerStateActions => ({
  type: SERVER_STATE_WIFI_STRENGHT_FETCH_FULFILLED,
  signalStrengh: data.signalStrengh,
  lastUpdate: data.lastUpdate
});

export const serverStateFetchRejected = (err: any): ServerStateActions => ({
  type: SERVER_STATE_FETCH_REJECTED,
  err,
  error: true,
    isFetching: false,
    fetchStatus: `errored: ${err.message}`
});

export const actions = {
  serverStateFetch,
  serverStateFetchCancel,
  serverStateFetchFulfilled,
  serverStateFetchRejected,
  serverStateBatteryFetchFulfilled,
  serverStateWIFIStrenghtFetchFulfilled
};
