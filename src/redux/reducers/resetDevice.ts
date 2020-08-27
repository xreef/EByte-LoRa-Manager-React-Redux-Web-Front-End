import {
    key,
    RESET_DEVICE_FETCH,
    RESET_DEVICE_FETCH_CANCEL,
    RESET_DEVICE_FETCH_FULFILLED,
    RESET_DEVICE_FETCH_REJECTED,
    IResetDeviceState
} from "../types/resetDevice";
import {ResetDeviceActions, IStatus} from "../types/resetDevice";
import {RootState} from "./index";

export const resetDeviceSelectors = {
  resetDevice: (state: RootState | any): IStatus => state[key].status,
  fetchStatus: (state: RootState): string | undefined => state[key].fetchStatus
};

// export const resetDeviceInitialState: IResetDevice = {
//     frequency: undefined,
//     version: undefined,
//     features: undefined
// }

const initialState: IResetDeviceState = {
    // resetDevice?: undefined,
    lastUpdate: undefined,

    isFetching: false,
    fetchStatus: `fetching... ${(new Date()).toLocaleString()}`,

    errors: [],
    valid: false
};

export default function resetDeviceReducer(state = initialState, action: ResetDeviceActions): IResetDeviceState {
  switch (action.type) {
    case RESET_DEVICE_FETCH:
      return {
        ...state,
        isFetching: true,
        fetchStatus: `fetching... ${(new Date()).toLocaleString()}`,
        status: undefined,
        lastUpdate: undefined
      };
    case RESET_DEVICE_FETCH_FULFILLED:
      return {
        ...state,
          status: action.status,
        isFetching: false,
        fetchStatus: `Results from ${(new Date()).toLocaleString()}`,
        lastUpdate: action.lastUpdate,
        valid: true
      };
    case RESET_DEVICE_FETCH_REJECTED:
        // debugger
      return {
        ...state,
        isFetching: false,
        fetchStatus: `errored: ${action.err.message}`,
        errors: [action.err.message]
      };
    case RESET_DEVICE_FETCH_CANCEL:
      return {
        ...state,
        isFetching: false,
        fetchStatus: 'user cancelled'
      };
    default:
      return state;
  }
}
