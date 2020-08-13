import {
    DEVICE_MESSAGES_FIELD_UPDATED,
    DEVICE_MESSAGES_FIELD_INVALID,
    DEVICE_MESSAGES_SEND_TRANSPARENT,
    DEVICE_MESSAGES_SEND_TRANSPARENT_SUCCESS,
    DEVICE_MESSAGES_SEND_TRANSPARENT_FAILED,
    DeviceMessagesActions,
    DEVICE_MESSAGES_SEND_BROADCAST,
    DEVICE_MESSAGES_SEND_BROADCAST_SUCCESS,
    DEVICE_MESSAGES_SEND_BROADCAST_FAILED,
    DEVICE_MESSAGES_SEND_FIXED,
    DEVICE_MESSAGES_SEND_FIXED_SUCCESS,
    DEVICE_MESSAGES_SEND_FIXED_FAILED, DEVICE_MESSAGES_RECEIVED
} from "../types/deviceMessages";


// action creators
export const deviceMessagesFieldUpdated = (CHAN: number, deviceMessage: string, lastUpdate: Date): DeviceMessagesActions => ({
    type: DEVICE_MESSAGES_FIELD_UPDATED,
    deviceMessage: deviceMessage,
    CHAN,
    lastUpdate: lastUpdate,
    isFetching: false
});

export const deviceMessagesFieldInvalid = (errors: string[]): DeviceMessagesActions => ({
  type: DEVICE_MESSAGES_FIELD_INVALID,
    errors,
    isFetching: false,
    fetchStatus: 'field invalid'

});

export const deviceMessagesSendTransparent = (deviceMessage: string, lastUpdate: Date): DeviceMessagesActions => ({
    type: DEVICE_MESSAGES_SEND_TRANSPARENT,
    deviceMessage: deviceMessage,
    lastUpdate: lastUpdate,
    isFetching: true
});
export const deviceMessagesSendTransparentSuccess = (deviceMessage: string): DeviceMessagesActions => ({
    type: DEVICE_MESSAGES_SEND_TRANSPARENT_SUCCESS,
    isFetching: false,
    deviceMessage: deviceMessage,
});

export const deviceMessagesSendTransparentFailed = (err: Error): DeviceMessagesActions => ({
    type: DEVICE_MESSAGES_SEND_TRANSPARENT_FAILED,
    err: err,
    isFetching: false,
    fetchStatus: `errored: ${err.message}`
});
export const deviceMessagesSendBroadcast = (CHAN: number, deviceMessage: string, lastUpdate: Date): DeviceMessagesActions => ({
    type: DEVICE_MESSAGES_SEND_BROADCAST,
    CHAN,
    deviceMessage: deviceMessage,
    lastUpdate: lastUpdate,
    isFetching: true
});
export const deviceMessagesSendBroadcastSuccess = (CHAN: number, deviceMessage: string): DeviceMessagesActions => ({
    type: DEVICE_MESSAGES_SEND_BROADCAST_SUCCESS,
    isFetching: false,
    deviceMessage: deviceMessage,
    CHAN
});

export const deviceMessagesSendBroadcastFailed = (err: Error): DeviceMessagesActions => ({
    type: DEVICE_MESSAGES_SEND_BROADCAST_FAILED,
    err: err,
    isFetching: false,
    fetchStatus: `errored: ${err.message}`
});

export const deviceMessagesSendFixed = (CHAN: number, ADDH: number, ADDL: number, deviceMessage: string, lastUpdate: Date): DeviceMessagesActions => ({
    type: DEVICE_MESSAGES_SEND_FIXED,
    CHAN,
    ADDH,
    ADDL,
    deviceMessage: deviceMessage,
    lastUpdate: lastUpdate,
    isFetching: true
});
export const deviceMessagesSendFixedSuccess = (CHAN: number, ADDH: number, ADDL: number, deviceMessage: string): DeviceMessagesActions => ({
    type: DEVICE_MESSAGES_SEND_FIXED_SUCCESS,
    isFetching: false,
    deviceMessage: deviceMessage,
    CHAN,
    ADDH,
    ADDL
});

export const deviceMessagesSendFixedFailed = (err: Error): DeviceMessagesActions => ({
    type: DEVICE_MESSAGES_SEND_FIXED_FAILED,
    err: err,
    isFetching: false,
    fetchStatus: `errored: ${err.message}`
});

export const deviceMessagesReceived = (messageReceived: string): DeviceMessagesActions => ({
    type: DEVICE_MESSAGES_RECEIVED,
    messageReceived
});


export const actions = {
    deviceMessagesFieldUpdated,
    deviceMessagesFieldInvalid,
    deviceMessagesSendTransparent,
    deviceMessagesSendTransparentSuccess,
    deviceMessagesSendTransparentFailed,

    deviceMessagesSendBroadcast,
    deviceMessagesSendBroadcastSuccess,
    deviceMessagesSendBroadcastFailed,
    deviceMessagesSendFixed,
    deviceMessagesSendFixedSuccess,
    deviceMessagesSendFixedFailed,

    deviceMessagesReceived
};
