import {
    // WEB_SOCKET_OPEN,
    // WEB_SOCKET_CLOSE,
    WEB_SOCKET_ERROR,
    WEB_SOCKET_MESSAGE,
    WEB_SOCKET_SEND_MESSAGE,
    WEB_SOCKET_CONNECT,
    WEB_SOCKET_DISCONNECT,
    WebSocketActions,
    IWebSocketState,
    key,
    WEB_SOCKET_CLOSE
} from "../types/webSocket";
import {RootState} from "./index";
import {IConfiguration} from "../types/configuration";

export const webSocketSelectors = {
    isConnected: (state: RootState | any): boolean => state[key].isConnected,
    singleMessage: (state: RootState | any): boolean => state[key].singleMessage,
};

const initialState = {
  messageToSend: '',
  isConnected: false,
  lastUpdate: null
};

export default function webSocketReducer(state = initialState, action: WebSocketActions): IWebSocketState {
  switch (action.type) {
    case WEB_SOCKET_CONNECT:
      return {
        ...state,
        isConnected: true
      };
    case WEB_SOCKET_DISCONNECT:
      return {
        ...state,
        isConnected: false
      };
    case WEB_SOCKET_CLOSE:
      debugger
      return {
        ...state
      };
    case WEB_SOCKET_ERROR:
      return {
        ...state,
        error: action.error
      };
    case WEB_SOCKET_MESSAGE:
      return {
        ...state,
        message: action.message
      };
    case WEB_SOCKET_SEND_MESSAGE:
      debugger
      return {
        ...state,
        messageToSend: action.message
      };
    default:
      return state;
  }
}
