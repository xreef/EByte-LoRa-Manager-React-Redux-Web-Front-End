// unique key namespace used by combineReducers.
// By convention it will match the directory structure to
// make it easy to locate the src.
// Also action types will prefix with the capitalized version
import {Action} from "redux";
import {TRANSMISSION_POWER_100, TRANSMISSION_POWER_1W} from "./configuration";

export const key = 'moduleInfo';

// action type constants
export const MODULE_INFO_FETCH = 'MODULE_INFO_FETCH';
export const MODULE_INFO_FETCH_CANCEL = 'MODULE_INFO_FETCH_CANCEL';
export const MODULE_INFO_FETCH_FULFILLED = 'MODULE_INFO_FETCH_FULFILLED';
export const MODULE_INFO_FETCH_REJECTED = 'MODULE_INFO_FETCH_REJECTED';
export const MODULE_INFO_BATTERY_FETCH_FULFILLED = 'MODULE_INFO_BATTERY_FETCH_FULFILLED';
export const MODULE_INFO_WIFI_STRENGHT_FETCH_FULFILLED = 'MODULE_INFO_WIFI_STRENGHT_FETCH_FULFILLED';

export const actionTypes = {
    MODULE_INFO_FETCH,
    MODULE_INFO_FETCH_CANCEL,
    MODULE_INFO_FETCH_FULFILLED,
    MODULE_INFO_FETCH_REJECTED,
    MODULE_INFO_BATTERY_FETCH_FULFILLED,
    MODULE_INFO_WIFI_STRENGHT_FETCH_FULFILLED
};

// User gives the module instruction (HEX format): C3 C3 C3,Module
// returns its present version number, for example C3 32 xx yy. the second bytes means frequency. 32
// here means the frequency is 433MHZ, 38 means frequency is 470MHz, 45 means frequency is;
// 868MHz, 44 means the frequency is 915 MHz, 46 means the frequency is 170MHz; xx is the
// version number and yy refers to the other module features.

// OPERATING_FREQUENCY 410
// defined(FREQUENCY_170)
// OPERATING_FREQUENCY 130
// defined(FREQUENCY_470)
// OPERATING_FREQUENCY 370
// defined(FREQUENCY_868)
// OPERATING_FREQUENCY 862
// defined(FREQUENCY_915)
// OPERATING_FREQUENCY 900

interface FFMI {
    [key: number]: {standard: number, initial: number};
}
export const frequencyFromModuleInfo:FFMI = {
    32: {
        standard: 433,
        initial: 410
    },
    38: {
        standard: 470,
        initial: 370
    },
    45: {
        standard: 868,
        initial: 862
    },
    44: {
        standard: 915,
        initial: 900
    },
    46: {
        standard: 170,
        initial: 130
    }
}

interface PFMI {
    [key: string]: {model: string, powerData: any, maxPower: number}
}

export const powerFromModuleInfo: PFMI = {
    '14': {
        model: '100mw',
        powerData: TRANSMISSION_POWER_100,
        maxPower: 20
    },
    '1e': {
        model: '1W',
        powerData: TRANSMISSION_POWER_1W,
        maxPower: 30
    }
}

export interface IModuleInfo {
    frequency?: number,
    version?: number,
    features?: string
}

export interface IModuleInfoState {
    moduleInfo?: IModuleInfo,
    lastUpdate?: Date | undefined;

    isFetching: boolean,
    fetchStatus?: string,

    errors?: string[],
    valid: boolean,
}

class ModuleInfoFetch implements Action{
    readonly type = MODULE_INFO_FETCH;
    isFetching: boolean = false;
    fetchStatus?: string = ''; // `fetching... ${(new Date()).toLocaleString()}`;
    lastUpdate?: Date = new Date()
}
class ModuleInfoFetchCancel implements Action {
    readonly type = MODULE_INFO_FETCH_CANCEL;
    isFetching: boolean = false;
    fetchStatus: string = ''//'user cancelled'
}
class ModuleInfoFetchFulfilled implements Action {
    readonly type = MODULE_INFO_FETCH_FULFILLED;
    isFetching: boolean = false;
    fetchStatus?: string = '';//`Results from ${(new Date()).toLocaleString()}`;
    lastUpdate?: Date = new Date();
    constructor(public moduleInfo: IModuleInfo) {}
}
class ModuleInfoFetchRejected implements Action {
    readonly type = MODULE_INFO_FETCH_REJECTED;
    isFetching: boolean = false;
    fetchStatus: string = ''; //`errored: ${action.payload};
    // err: any = {};
    constructor(public err: any) {}
}

export type ModuleInfoActions = ModuleInfoFetch | ModuleInfoFetchCancel | ModuleInfoFetchFulfilled |
    ModuleInfoFetchRejected;
