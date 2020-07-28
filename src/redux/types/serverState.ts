
// unique key namespace used by combineReducers.
// By convention it will match the directory structure to
// make it easy to locate the src.
// Also action types will prefix with the capitalized version
import {Action} from "redux";
// import {IConfiguration} from "./configuration";

export const key = 'serverState';

// action type constants
export const SERVER_STATE_FETCH = 'SERVER_STATE_FETCH';
export const SERVER_STATE_FETCH_CANCEL = 'SERVER_STATE_FETCH_CANCEL';
export const SERVER_STATE_FETCH_FULFILLED = 'SERVER_STATE_FETCH_FULFILLED';
export const SERVER_STATE_FETCH_REJECTED = 'SERVER_STATE_FETCH_REJECTED';
export const SERVER_STATE_BATTERY_FETCH_FULFILLED = 'SERVER_STATE_BATTERY_FETCH_FULFILLED';
export const SERVER_STATE_WIFI_STRENGHT_FETCH_FULFILLED = 'SERVER_STATE_WIFI_STRENGHT_FETCH_FULFILLED';

export const actionTypes = {
    SERVER_STATE_FETCH,
    SERVER_STATE_FETCH_CANCEL,
    SERVER_STATE_FETCH_FULFILLED,
    SERVER_STATE_FETCH_REJECTED,
    SERVER_STATE_BATTERY_FETCH_FULFILLED,
    SERVER_STATE_WIFI_STRENGHT_FETCH_FULFILLED
};

export interface IServerState {
    data: any;
    voltage: number;
    signalStrenght: number;
    lastUpdate?: Date | undefined | null;

    isFetching: boolean;
    fetchStatus?: string;

    err?: any;
    error: boolean;
}

class ServerStateFetch implements Action {
    readonly type = SERVER_STATE_FETCH;
    isFetching: boolean = false;
    fetchStatus?: string = ''; // `fetching... ${(new Date()).toLocaleString()}`;
    lastUpdate: Date | null = null;
}

class ServerStateFetchCancel implements Action {
    readonly type = SERVER_STATE_FETCH_CANCEL;
    isFetching: boolean = false;
    fetchStatus: string = ''//'user cancelled'
}

class ServerStateFetchFulfilled implements Action {
    readonly type = SERVER_STATE_FETCH_FULFILLED;
    isFetching: boolean = false;
    fetchStatus?: string = '';//`Results from ${(new Date()).toLocaleString()}`;
    lastUpdate: Date = new Date();
    constructor(public data: any) {}
}

class ServerStateBatteryFetchFulfilled implements Action {
    readonly type = SERVER_STATE_BATTERY_FETCH_FULFILLED;
    voltage: number = 0;
    lastUpdate?: Date;
}

class ServerStateWIFIStrenghtFetchFulfilled implements Action {
    readonly type = SERVER_STATE_WIFI_STRENGHT_FETCH_FULFILLED;
    signalStrengh: number = 0;
    lastUpdate?: Date
}

class ServerStateFetchRejected implements Action {
    readonly type = SERVER_STATE_FETCH_REJECTED;
    isFetching: boolean = false;
    fetchStatus: string = ''; //`errored: ${action.payload};
    err: object = {};
    error: boolean = true;
}

export type ServerStateActions = ServerStateFetch | ServerStateBatteryFetchFulfilled | ServerStateFetchCancel |
    ServerStateFetchRejected | ServerStateWIFIStrenghtFetchFulfilled | ServerStateFetchFulfilled;
