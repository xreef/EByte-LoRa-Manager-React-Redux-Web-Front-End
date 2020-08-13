import {
    key,
    DEVICE_MESSAGES_FIELD_UPDATED,
    DEVICE_MESSAGES_FIELD_INVALID,
    DEVICE_MESSAGES_SEND_TRANSPARENT_SUCCESS,
    DEVICE_MESSAGES_SEND_TRANSPARENT_FAILED,
    IDeviceMessagesState,
    DEVICE_MESSAGES_SEND_TRANSPARENT,
    DEVICE_MESSAGES_SEND_BROADCAST,
    DEVICE_MESSAGES_SEND_BROADCAST_SUCCESS,
    DEVICE_MESSAGES_SEND_BROADCAST_FAILED,
    DEVICE_MESSAGES_SEND_FIXED,
    DEVICE_MESSAGES_SEND_FIXED_SUCCESS,
    DEVICE_MESSAGES_SEND_FIXED_FAILED, DEVICE_MESSAGES_RECEIVED
} from "../types/deviceMessages";
import {DeviceMessagesActions} from "../types/deviceMessages";
import {RootState} from "./index";

export const deviceMessagesSelectors = {
  deviceMessage: (state: RootState | any): string => state[key].deviceMessages,
  lastUpdate: (state: RootState): Date | undefined => state.deviceMessages.lastUpdate,
  fetchStatus: (state: RootState): string | undefined => state[key].fetchStatus
};

const initialState: IDeviceMessagesState = {
    // CHAN: 0,
    // deviceMessage: '',
    lastUpdate: undefined,

    deviceMessages: [],

    messagesReceived: [],

    isFetching: true,
    fetchStatus: `fetching... ${(new Date()).toLocaleString()}`,

    errors: [],
    valid: false,

    message: undefined

};

export default function deviceMessagesReducer(state = initialState, action: DeviceMessagesActions): IDeviceMessagesState {
  switch (action.type) {
    case DEVICE_MESSAGES_FIELD_UPDATED:
    { // updates dataToUpdate and clears errors
      return {
        ...state,
        // deviceMessages: action.deviceMessages,
        errors: [],
        valid: true,
        message: ''
      };
    }
    case DEVICE_MESSAGES_FIELD_INVALID:
    { // updates dataToUpdate but displays errors
      return {
        ...state,
        errors: action.errors,
        valid: false,
        message: '',
        isFetching: action.isFetching

      };
    }
      case DEVICE_MESSAGES_SEND_TRANSPARENT:
      { // updates dataToUpdate and clears errors
          return {
              ...state,
              // deviceMessages: action.deviceMessages,
              isFetching: action.isFetching,
              errors: [],
              valid: true,
              message: ''
          };
      }
      case DEVICE_MESSAGES_SEND_TRANSPARENT_SUCCESS:
    { // add user to list, update message
      return {
        ...state,
        deviceMessages: [...state.deviceMessages, {type: "transparent", message: action.deviceMessage, date: new Date()}],
        errors: [],
        valid: true,
        message: 'Update succesfully',
        isFetching: action.isFetching
      };
    }
    case DEVICE_MESSAGES_SEND_TRANSPARENT_FAILED:
    { // failed to add to server, display error
        return {
            ...state,
            isFetching: action.isFetching,
            fetchStatus: `errored: ${action.err.description}`,
            errors: [action.err.description]
        };
    }
      case DEVICE_MESSAGES_SEND_BROADCAST:
      { // updates dataToUpdate and clears errors
          return {
              ...state,
              // deviceMessages: action.deviceMessages,
              isFetching: action.isFetching,
              errors: [],
              valid: true,
              message: ''
          };
      }
      case DEVICE_MESSAGES_SEND_BROADCAST_SUCCESS:
    { // add user to list, update message
      return {
        ...state,
        deviceMessages: [...state.deviceMessages, {type: "broadcast", CHAN: action.CHAN, message: action.deviceMessage, date: new Date()}],
        errors: [],
        valid: true,
        message: 'Update succesfully',
        isFetching: action.isFetching
      };
    }
    case DEVICE_MESSAGES_SEND_BROADCAST_FAILED:
    { // failed to add to server, display error
        return {
            ...state,
            isFetching: action.isFetching,
            fetchStatus: `errored: ${action.err.description}`,
            errors: [action.err.description]
        };
    }
      case DEVICE_MESSAGES_SEND_FIXED:
      { // updates dataToUpdate and clears errors
          return {
              ...state,
              // deviceMessages: action.deviceMessages,
              isFetching: action.isFetching,
              errors: [],
              valid: true,
              message: ''
          };
      }
      case DEVICE_MESSAGES_SEND_FIXED_SUCCESS:
    { // add user to list, update message
      return {
        ...state,
        deviceMessages: [...state.deviceMessages, {type: "fixed", CHAN: action.CHAN, ADDH: action.ADDH, ADDL: action.ADDL, message: action.deviceMessage, date: new Date()}],
        errors: [],
        valid: true,
        message: 'Update succesfully',
        isFetching: action.isFetching
      };
    }
    case DEVICE_MESSAGES_SEND_FIXED_FAILED:
    { // failed to add to server, display error
        return {
            ...state,
            isFetching: action.isFetching,
            fetchStatus: `errored: ${action.err.description}`,
            errors: [action.err.description]
        };
    }
    case DEVICE_MESSAGES_RECEIVED:
    { // failed to add to server, display error
        return {
            ...state,
            messageReceived: {message: action.messageReceived, date: new Date()},
        };
    }

    default:
      return state;
  }
}
