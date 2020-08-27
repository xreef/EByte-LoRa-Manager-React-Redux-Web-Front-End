import {
    RESET_DEVICE_FETCH,
    RESET_DEVICE_FETCH_CANCEL,
    RESET_DEVICE_FETCH_FULFILLED,
    RESET_DEVICE_FETCH_REJECTED,
    IStatus, ResetDeviceActions
} from "../types/resetDevice";


// action creators
export const resetDeviceFetch = (): ResetDeviceActions => ({
  type: RESET_DEVICE_FETCH,
    isFetching: false,
    fetchStatus: `start fetching... ${(new Date()).toLocaleString()}`
});
export const resetDeviceFetchCancel = (): ResetDeviceActions => (
  {
    type: RESET_DEVICE_FETCH_CANCEL,
    isFetching: false,
    fetchStatus: 'user cancelled'

}
);
export const resetDeviceFetchFulfilled = (status: IStatus, lastUpdate: Date): ResetDeviceActions => ({
  type: RESET_DEVICE_FETCH_FULFILLED,
    status: status,
  lastUpdate: lastUpdate,
    isFetching: false,
    fetchStatus: `Results from ${(new Date()).toLocaleString()}`
});

export const resetDeviceFetchRejected = (err: any): ResetDeviceActions => {
    return {
        type: RESET_DEVICE_FETCH_REJECTED,
        err: err,
        isFetching: false,
        fetchStatus: `errored: ${err.message}`
    }
};

export const actions = {
  resetDeviceFetch,
  resetDeviceFetchCancel,
  resetDeviceFetchFulfilled,
  resetDeviceFetchRejected
};
