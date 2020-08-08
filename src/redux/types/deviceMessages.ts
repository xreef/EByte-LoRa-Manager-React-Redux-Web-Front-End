import {Action} from "redux";

export const MESSAGE_SIZE = 58;

export interface IDeviceMessage {
    CHAN?: number,
    ADDL?: number,
    ADDH?: number,
    type: "transparent" | "fixed" | "broadcast",
    message: string,
    date: Date
}

export interface IDeviceMessagesState {
    CHAN: number;
    deviceMessage: string;
    lastUpdate?: Date | undefined;

    deviceMessages: IDeviceMessage[],

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
export const key = 'deviceMessages';

// action type constants POST
export const DEVICE_MESSAGES_FIELD_UPDATED = 'DEVICE_MESSAGES_FIELD_UPDATED';
export const DEVICE_MESSAGES_FIELD_INVALID = 'DEVICE_MESSAGES_FIELD_INVALID';
export const DEVICE_MESSAGES_SEND_TRANSPARENT = 'DEVICE_MESSAGES_SEND_TRANSPARENT';
export const DEVICE_MESSAGES_SEND_TRANSPARENT_SUCCESS = 'DEVICE_MESSAGES_SEND_TRANSPARENT_SUCCESS';
export const DEVICE_MESSAGES_SEND_TRANSPARENT_FAILED = 'DEVICE_MESSAGES_SEND_TRANSPARENT_FAILED';
export const DEVICE_MESSAGES_SEND_BROADCAST = 'DEVICE_MESSAGES_SEND_BROADCAST';
export const DEVICE_MESSAGES_SEND_BROADCAST_SUCCESS = 'DEVICE_MESSAGES_SEND_BROADCAST_SUCCESS';
export const DEVICE_MESSAGES_SEND_BROADCAST_FAILED = 'DEVICE_MESSAGES_SEND_BROADCAST_FAILED';
export const DEVICE_MESSAGES_SEND_FIXED = 'DEVICE_MESSAGES_SEND_FIXED';
export const DEVICE_MESSAGES_SEND_FIXED_SUCCESS = 'DEVICE_MESSAGES_SEND_FIXED_SUCCESS';
export const DEVICE_MESSAGES_SEND_FIXED_FAILED = 'DEVICE_MESSAGES_SEND_FIXED_FAILED';

export const actionTypes = {
    DEVICE_MESSAGES_FIELD_UPDATED,
    DEVICE_MESSAGES_FIELD_INVALID,
    DEVICE_MESSAGES_SEND_TRANSPARENT,
    DEVICE_MESSAGES_SEND_TRANSPARENT_SUCCESS,
    DEVICE_MESSAGES_SEND_TRANSPARENT_FAILED,
    DEVICE_MESSAGES_SEND_BROADCAST,
    DEVICE_MESSAGES_SEND_BROADCAST_SUCCESS,
    DEVICE_MESSAGES_SEND_BROADCAST_FAILED,
    DEVICE_MESSAGES_SEND_FIXED,
    DEVICE_MESSAGES_SEND_FIXED_SUCCESS,
    DEVICE_MESSAGES_SEND_FIXED_FAILED
};

class DeviceMessagesFieldUpdated implements Action {
    readonly type = DEVICE_MESSAGES_FIELD_UPDATED;
    isFetching: boolean = false;
    fetchStatus?: string = '';//`Results from ${(new Date()).toLocaleString()}`;
    lastUpdate?: Date = new Date();
    // deviceMessages?: IDeviceMessages | undefined;
    constructor(public deviceMessage: string, public CHAN: number) {}
}

class DeviceMessagesFieldInvalid implements Action {
    readonly type = DEVICE_MESSAGES_FIELD_INVALID;
    isFetching: boolean = false;
    fetchStatus: string = ''; //`errored: ${action.payload};
    constructor(public errors: string[]) {}
}
class DeviceMessagesSendTransparent implements Action {
    readonly type = DEVICE_MESSAGES_SEND_TRANSPARENT;
    isFetching: boolean = true;
    fetchStatus?: string = '';//`Results from ${(new Date()).toLocaleString()}`;
    lastUpdate?: Date = new Date();
    // deviceMessages?: IDeviceMessages | undefined;
    constructor(public deviceMessage: string) {}
}
class DeviceMessagesSendTransparentSuccess implements Action {
    readonly type = DEVICE_MESSAGES_SEND_TRANSPARENT_SUCCESS;
    isFetching: boolean = false;
    constructor(public deviceMessage: string) {}
}
class DeviceMessagesSendTransparentFailed implements Action {
    readonly type = DEVICE_MESSAGES_SEND_TRANSPARENT_FAILED;
    isFetching: boolean = false;
    fetchStatus: string = ''; //`errored: ${action.payload};
    // err: any = {};
    constructor(public err: any) {}
}
class DeviceMessagesSendBroadcast implements Action {
    readonly type = DEVICE_MESSAGES_SEND_BROADCAST;
    isFetching: boolean = true;
    fetchStatus?: string = '';//`Results from ${(new Date()).toLocaleString()}`;
    lastUpdate?: Date = new Date();
    // deviceMessages?: IDeviceMessages | undefined;
    constructor(public deviceMessage: string, public CHAN: number) {}
}
class DeviceMessagesSendBroadcastSuccess implements Action {
    readonly type = DEVICE_MESSAGES_SEND_BROADCAST_SUCCESS;
    isFetching: boolean = false;
    constructor(public deviceMessage: string, public CHAN: number) {}
}
class DeviceMessagesSendBroadcastFailed implements Action {
    readonly type = DEVICE_MESSAGES_SEND_BROADCAST_FAILED;
    isFetching: boolean = false;
    fetchStatus: string = ''; //`errored: ${action.payload};
    // err: any = {};
    constructor(public err: any) {}
}
class DeviceMessagesSendFixed implements Action {
    readonly type = DEVICE_MESSAGES_SEND_FIXED;
    isFetching: boolean = true;
    fetchStatus?: string = '';//`Results from ${(new Date()).toLocaleString()}`;
    lastUpdate?: Date = new Date();
    // deviceMessages?: IDeviceMessages | undefined;
    constructor(public deviceMessage: string, public CHAN: number, public ADDH: number, public ADDL: number) {}
}
class DeviceMessagesSendFixedSuccess implements Action {
    readonly type = DEVICE_MESSAGES_SEND_FIXED_SUCCESS;
    isFetching: boolean = false;
    constructor(public deviceMessage: string, public CHAN: number, public ADDH: number, public ADDL: number) {}
}
class DeviceMessagesSendFixedFailed implements Action {
    readonly type = DEVICE_MESSAGES_SEND_FIXED_FAILED;
    isFetching: boolean = false;
    fetchStatus: string = ''; //`errored: ${action.payload};
    // err: any = {};
    constructor(public err: any) {}
}


export type DeviceMessagesActions = DeviceMessagesFieldUpdated | DeviceMessagesFieldInvalid | DeviceMessagesSendTransparent |
    DeviceMessagesSendTransparentSuccess | DeviceMessagesSendTransparentFailed | DeviceMessagesSendBroadcast |
    DeviceMessagesSendBroadcastSuccess | DeviceMessagesSendBroadcastFailed | DeviceMessagesSendFixed |
    DeviceMessagesSendFixedSuccess | DeviceMessagesSendFixedFailed;
