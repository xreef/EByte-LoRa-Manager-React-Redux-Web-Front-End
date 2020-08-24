
// unique key namespace used by combineReducers.
// By convention it will match the directory structure to
// make it easy to locate the src.
// Also action types will prefix with the capitalized version

import {Action} from "redux";
import {IConfiguration} from "./configuration";

export const key = 'webSocket';

// action type constants
export const WEB_SOCKET_OPEN = 'WEB_SOCKET_OPEN';
export const WEB_SOCKET_CONNECT = 'WEB_SOCKET_CONNECT';
export const WEB_SOCKET_DISCONNECT = 'WEB_SOCKET_DISCONNECT';
export const WEB_SOCKET_CLOSE = 'WEB_SOCKET_CLOSE';
export const WEB_SOCKET_ERROR = 'WEB_SOCKET_ERROR';
export const WEB_SOCKET_MESSAGE = 'WEB_SOCKET_MESSAGE';
export const WEB_SOCKET_SEND_MESSAGE = 'WEB_SOCKET_SEND_MESSAGE';
export const WEB_SOCKET_SINGLE_MESSAGE = 'WEB_SOCKET_SINGLE_MESSAGE';
export const WEB_SOCKET_RECEIVING_DEVICE_MESSAGE = 'WEB_SOCKET_RECEIVING_DEVICE_MESSAGE';

export const actionTypes = {
    open: WEB_SOCKET_OPEN,
    connect: WEB_SOCKET_CONNECT,
    disconnect: WEB_SOCKET_DISCONNECT,
    close: WEB_SOCKET_CLOSE,
    error: WEB_SOCKET_ERROR,
    message: WEB_SOCKET_MESSAGE,
    sendMessage: WEB_SOCKET_SEND_MESSAGE
};

export interface IWebSocketState {
    message?: any;
    error?: Event;

    messageToSend?: string,
    isConnected: boolean,
    singleMessage?: boolean,
    receivingDeviceMessages?: boolean,

    lastUpdate: null
}

class WebSocketSingleMessage implements Action {
    readonly type = WEB_SOCKET_SINGLE_MESSAGE;
    constructor(public singleMessage: boolean) {}
}

class WebSocketReceivingDeviceMessages implements Action {
    readonly type = WEB_SOCKET_RECEIVING_DEVICE_MESSAGE;
    constructor(public receivingDeviceMessages: boolean) {}
}


class WebSocketOpen implements Action {
    readonly type = WEB_SOCKET_OPEN;
    isConnected: boolean = false;
    lastUpdate: Date = new Date()
    // constructor(public singleMessage: boolean) {}

}
// action creators
class WebSocketConnect implements Action {
    readonly type = WEB_SOCKET_CONNECT;
    isConnected: boolean = true;
    lastUpdate: Date = new Date()
}
// action creators
class WebSocketDisconnect implements Action {
    readonly type = WEB_SOCKET_DISCONNECT
    isConnected: boolean = false;
    lastUpdate: Date = new Date()
}
class WebSocketClose implements Action {
    readonly type = WEB_SOCKET_CLOSE;
    // isConnected: boolean = false;
    lastUpdate: Date = new Date()
}
class WebSocketError implements Action {
    readonly type = WEB_SOCKET_ERROR;
    error?: Event;
    isConnected: boolean = false;
    lastUpdate: Date = new Date()

}
class WebSocketMessage implements Action {
    readonly type = WEB_SOCKET_MESSAGE;
    message: any;
}
class WebSocketSendMessage implements Action {
    readonly type = WEB_SOCKET_SEND_MESSAGE;
    message: any
}

export type WebSocketActions =  WebSocketOpen | WebSocketConnect | WebSocketDisconnect | WebSocketClose |
                                WebSocketError | WebSocketMessage | WebSocketSendMessage | WebSocketSingleMessage |
                                WebSocketReceivingDeviceMessages;

class MessageReceived {
    readonly type = "message";
    constructor(public code: number, public description: string, public error: boolean, public message?: string) {}
}

export type WebSocketMessages = MessageReceived;
