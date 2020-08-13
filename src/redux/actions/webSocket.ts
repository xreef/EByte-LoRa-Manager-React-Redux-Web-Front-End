
// action creators
import {
    WEB_SOCKET_CLOSE,
    WEB_SOCKET_CONNECT,
    WEB_SOCKET_DISCONNECT,
    WEB_SOCKET_ERROR, WEB_SOCKET_MESSAGE,
    WEB_SOCKET_OPEN, WEB_SOCKET_SEND_MESSAGE, WebSocketActions
} from "../types/webSocket";

export const webSocketOpen = (singleMessage: boolean): WebSocketActions => ({
    type: WEB_SOCKET_OPEN,
    isConnected: false,
    singleMessage,
    lastUpdate: new Date()
});
// action creators
export const webSocketConnect = (): WebSocketActions => ({
    type: WEB_SOCKET_CONNECT,
    isConnected: true,
    lastUpdate: new Date()
});
// action creators
export const webSocketDisconnect = (): WebSocketActions => ({
  type: WEB_SOCKET_DISCONNECT,
    isConnected: false,
    lastUpdate: new Date()
});
export const webSocketClose = (): WebSocketActions => ({
  type: WEB_SOCKET_CLOSE,
    // isConnected: false,
    lastUpdate: new Date()
});
export const webSocketError = (event: Event): WebSocketActions => ({
  type: WEB_SOCKET_ERROR,
  error: event,
    isConnected: false,
    lastUpdate: new Date()
});
export const webSocketMessage = (message: any): WebSocketActions => ({
  type: WEB_SOCKET_MESSAGE,
  message: message
});
export const webSocketSendMessage = (message: any): WebSocketActions => ({
  type: WEB_SOCKET_SEND_MESSAGE,
    message
});

export const actions = {
  webSocketOpen,
  webSocketConnect,
  webSocketDisconnect,
  webSocketClose,
  webSocketError,
  webSocketMessage,
  webSocketSendMessage
};
