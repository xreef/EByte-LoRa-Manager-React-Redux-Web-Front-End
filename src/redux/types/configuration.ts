import {Action} from "redux";

export enum FORWARD_ERROR_CORRECTION_SWITCH
{
    FEC_0_OFF = 0b0,
    FEC_1_ON = 0b1
};
export enum FIDEX_TRANSMISSION
{
    FT_TRANSPARENT_TRANSMISSION = 0b0,
    FT_FIXED_TRANSMISSION = 0b1
};
export enum IO_DRIVE_MODE
{
    IO_D_MODE_OPEN_COLLECTOR = 0b0,
    IO_D_MODE_PUSH_PULLS_PULL_UPS = 0b1
};
export enum TRANSMISSION_POWER_100
{
    POWER_20 = 0b00,
    POWER_17 = 0b01,
    POWER_14 = 0b10,
    POWER_10 = 0b11
};

export enum TRANSMISSION_POWER_500
{
    POWER_27 = 0b00,
    POWER_24 = 0b01,
    POWER_21 = 0b10,
    POWER_18 = 0b11

};

export enum TRANSMISSION_POWER_1W
{
    POWER_30 = 0b00,
    POWER_27 = 0b01,
    POWER_24 = 0b10,
    POWER_21 = 0b11

};

export enum WIRELESS_WAKE_UP_TIME
{
    WAKE_UP_250 = 0b000,
    WAKE_UP_500 = 0b001,
    WAKE_UP_750 = 0b010,
    WAKE_UP_1000 = 0b011,
    WAKE_UP_1250 = 0b100,
    WAKE_UP_1500 = 0b101,
    WAKE_UP_1750 = 0b110,
    WAKE_UP_2000 = 0b111
};

export enum AIR_DATA_RATE
{
    AIR_DATA_RATE_000_03 = 0b000,
    AIR_DATA_RATE_001_12 = 0b001,
    AIR_DATA_RATE_010_24 = 0b010,
    AIR_DATA_RATE_011_48 = 0b011,
    AIR_DATA_RATE_100_96 = 0b100,
    AIR_DATA_RATE_101_192 = 0b101,
    AIR_DATA_RATE_110_192 = 0b110,
    AIR_DATA_RATE_111_192 = 0b111
};


export interface IOption {
    fec:number;
    fixedTransmission:number;
    ioDriveMode:number;
    transmissionPower:number;
    wirelessWakeupTime:number;
}

export enum UART_BPS_TYPE
{
    UART_BPS_1200 = 0b000,
    UART_BPS_2400 = 0b001,
    UART_BPS_4800 = 0b010,
    UART_BPS_9600 = 0b011,
    UART_BPS_19200 = 0b100,
    UART_BPS_38400 = 0b101,
    UART_BPS_57600 = 0b110,
    UART_BPS_115200 = 0b111
};

export enum UART_PARITY
{
    MODE_00_8N1 = 0b00,
    MODE_01_8O1 = 0b01,
    MODE_10_8E1 = 0b10,
    MODE_11_8N1 = 0b11
};


export interface ISped {
    airDataRate: number;
    uartBaudRate: number;
    uartParity: number;
}

export interface IConfiguration {
    ADDL: number,
    ADDH: number,
    CHAN: number,

    OPTION: IOption,
    SPED: ISped
//	configuration.ADDL = 0x2;
//	configuration.ADDH = 0x0;
//	configuration.CHAN = 0x4;
//
//	configuration.OPTION.fec = FEC_1_ON;
//	configuration.OPTION.fixedTransmission = FT_FIXED_TRANSMISSION;
//	configuration.OPTION.ioDriveMode = IO_D_MODE_PUSH_PULLS_PULL_UPS;
//	configuration.OPTION.transmissionPower = POWER_20;
//	configuration.OPTION.wirelessWakeupTime = WAKE_UP_250;
//
//	configuration.SPED.airDataRate = AIR_DATA_RATE_010_24;
//	configuration.SPED.uartBaudRate = UART_BPS_9600;
//	configuration.SPED.uartParity = MODE_00_8N1;
}

export interface IConfigurationState {
    configuration: IConfiguration;
    lastUpdate?: Date | undefined;

    isFetching: boolean,
    fetchStatus?: string,

    errors?: string[],
    valid: boolean,

    message?: string
}


// unique key namespace used by combineReducers.
// By convention it will match the directory structure to
// make it easy to locate the src.
// Also action types will prefix with the capitalized version
export const key = 'configuration';

// action type constants GET
export const CONFIGURATION_FETCH = 'CONFIGURATION_FETCH';
export const CONFIGURATION_FETCH_CANCEL = 'CONFIGURATION_FETCH_CANCEL';
export const CONFIGURATION_FETCH_FULFILLED = 'CONFIGURATION_FETCH_FULFILLED';
export const CONFIGURATION_FETCH_REJECTED = 'CONFIGURATION_FETCH_REJECTED';
// action type constants POST
export const CONFIGURATION_FIELD_UPDATED = 'CONFIGURATION_FIELD_UPDATED';
export const CONFIGURATION_FIELD_INVALID = 'CONFIGURATION_FIELD_INVALID';
export const CONFIGURATION_ADD = 'CONFIGURATION_ADD';
export const CONFIGURATION_ADD_SUCCESS = 'CONFIGURATION_ADD_SUCCESS';
export const CONFIGURATION_ADD_FAILED = 'CONFIGURATION_ADD_FAILED';

export const actionTypes = {
    CONFIGURATION_FETCH,
    CONFIGURATION_FETCH_CANCEL,
    CONFIGURATION_FETCH_FULFILLED,
    CONFIGURATION_FETCH_REJECTED,
    CONFIGURATION_FIELD_UPDATED,
    CONFIGURATION_FIELD_INVALID,
    CONFIGURATION_ADD,
    CONFIGURATION_ADD_SUCCESS,
    CONFIGURATION_ADD_FAILED
};

class ConfigurationFetch implements Action{
    readonly type = CONFIGURATION_FETCH;
    isFetching: boolean = false;
    fetchStatus?: string = ''; // `fetching... ${(new Date()).toLocaleString()}`;
    lastUpdate?: Date = new Date()
}
class ConfigurationFetchCancel implements Action {
    readonly type = CONFIGURATION_FETCH_CANCEL;
    isFetching: boolean = false;
    fetchStatus: string = ''//'user cancelled'
}
class ConfigurationFetchFulfilled implements Action {
    readonly type = CONFIGURATION_FETCH_FULFILLED;
    isFetching: boolean = false;
    fetchStatus?: string = '';//`Results from ${(new Date()).toLocaleString()}`;
    lastUpdate?: Date = new Date();
    constructor(public configuration: IConfiguration) {}
}
class ConfigurationFetchRejected implements Action {
    readonly type = CONFIGURATION_FETCH_REJECTED;
    isFetching: boolean = false;
    fetchStatus: string = ''; //`errored: ${action.payload};
    // err: any = {};
    constructor(public err: any) {}

    // constructor(public configuration: IConfiguration) {}
}
// class ConfigurationFieldUpdated {
//     readonly type = CONFIGURATION_FIELD_UPDATED;
//     errors: string[] = [];
//     configuration: IConfiguration = {
//         ADDH: 0,
//         ADDL: 0,
//         CHAN: 23,
//         OPTION: {
//             fec: FORWARD_ERROR_CORRECTION_SWITCH.FEC_1_ON,
//             fixedTransmission: FIDEX_TRANSMISSION.FT_TRANSPARENT_TRANSMISSION,
//             ioDriveMode: IO_DRIVE_MODE.IO_D_MODE_PUSH_PULLS_PULL_UPS,
//             transmissionPower: TRANSMISSION_POWER_100.POWER_20,
//             wirelessWakeupTime: WIRELESS_WAKE_UP_TIME.WAKE_UP_2000
//         },
//         SPED: {
//             airDataRate: AIR_DATA_RATE.AIR_DATA_RATE_010_24,
//             uartBaudRate: UART_BPS_TYPE.UART_BPS_9600,
//             uartParity: UART_PARITY.MODE_00_8N1
//         }
//     }
// }
class ConfigurationFieldUpdated implements Action {
    readonly type = CONFIGURATION_FIELD_UPDATED;
    isFetching: boolean = false;
    fetchStatus?: string = '';//`Results from ${(new Date()).toLocaleString()}`;
    lastUpdate?: Date = new Date();
    // configuration?: IConfiguration | undefined;
    constructor(public configuration: IConfiguration) {}
}

class ConfigurationFieldInvalid implements Action {
    readonly type = CONFIGURATION_FIELD_INVALID;
    isFetching: boolean = false;
    fetchStatus: string = ''; //`errored: ${action.payload};
    err?: any;
    errors: string[] = [];
    constructor(public configuration: IConfiguration) {}
}
class ConfigurationAdd implements Action {
    readonly type = CONFIGURATION_ADD;
}
class ConfigurationAddSuccess implements Action {
    readonly type = CONFIGURATION_ADD_SUCCESS;
    constructor(public configuration: IConfiguration) {}
}
class ConfigurationAddFailed implements Action {
    readonly type = CONFIGURATION_ADD_FAILED;
    err?: any;
}


export type ConfigurationActions = ConfigurationFetch | ConfigurationFetchCancel | ConfigurationFetchFulfilled |
    ConfigurationFetchRejected | ConfigurationFieldUpdated | ConfigurationFieldInvalid | ConfigurationAdd |
    ConfigurationAddSuccess | ConfigurationAddFailed;
