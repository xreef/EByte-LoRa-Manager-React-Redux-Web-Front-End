// unique key namespace used by combineReducers.
// By convention it will match the directory structure to
// make it easy to locate the src.
// Also action types will prefix with the capitalized version
import {Action} from "redux";
import {TRANSMISSION_POWER_100, TRANSMISSION_POWER_1W} from "./configuration";

export const key = 'resetDevice';

// action type constants
export const RESET_DEVICE_FETCH = 'RESET_DEVICE_FETCH';
export const RESET_DEVICE_FETCH_CANCEL = 'RESET_DEVICE_FETCH_CANCEL';
export const RESET_DEVICE_FETCH_FULFILLED = 'RESET_DEVICE_FETCH_FULFILLED';
export const RESET_DEVICE_FETCH_REJECTED = 'RESET_DEVICE_FETCH_REJECTED';
export const RESET_DEVICE_BATTERY_FETCH_FULFILLED = 'RESET_DEVICE_BATTERY_FETCH_FULFILLED';
export const RESET_DEVICE_WIFI_STRENGHT_FETCH_FULFILLED = 'RESET_DEVICE_WIFI_STRENGHT_FETCH_FULFILLED';

export const actionTypes = {
    RESET_DEVICE_FETCH,
    RESET_DEVICE_FETCH_CANCEL,
    RESET_DEVICE_FETCH_FULFILLED,
    RESET_DEVICE_FETCH_REJECTED,
    RESET_DEVICE_BATTERY_FETCH_FULFILLED,
    RESET_DEVICE_WIFI_STRENGHT_FETCH_FULFILLED
};

export interface IStatus {
        code: number,
        error: boolean,
        description: string
}

export interface IResetDeviceState {
    status?: IStatus,
    lastUpdate?: Date | undefined;

    isFetching: boolean,
    fetchStatus?: string,

    errors?: string[],
    valid: boolean,
}

class ResetDeviceFetch implements Action{
    readonly type = RESET_DEVICE_FETCH;
    isFetching: boolean = false;
    fetchStatus?: string = ''; // `fetching... ${(new Date()).toLocaleString()}`;
    lastUpdate?: Date = new Date()
}
class ResetDeviceFetchCancel implements Action {
    readonly type = RESET_DEVICE_FETCH_CANCEL;
    isFetching: boolean = false;
    fetchStatus: string = ''//'user cancelled'
}
class ResetDeviceFetchFulfilled implements Action {
    readonly type = RESET_DEVICE_FETCH_FULFILLED;
    isFetching: boolean = false;
    fetchStatus?: string = '';//`Results from ${(new Date()).toLocaleString()}`;
    lastUpdate?: Date = new Date();
    constructor(public status: IStatus) {}
}
class ResetDeviceFetchRejected implements Action {
    readonly type = RESET_DEVICE_FETCH_REJECTED;
    isFetching: boolean = false;
    fetchStatus: string = ''; //`errored: ${action.payload};
    // err: any = {};
    constructor(public err: any) {}
}

export type ResetDeviceActions = ResetDeviceFetch | ResetDeviceFetchCancel | ResetDeviceFetchFulfilled |
    ResetDeviceFetchRejected;
