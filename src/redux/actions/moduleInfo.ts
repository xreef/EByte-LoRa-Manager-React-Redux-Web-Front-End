import {
    MODULE_INFO_FETCH,
    MODULE_INFO_FETCH_CANCEL,
    MODULE_INFO_FETCH_FULFILLED,
    MODULE_INFO_FETCH_REJECTED,
    IModuleInfo, ModuleInfoActions
} from "../types/moduleInfo";


// action creators
export const moduleInfoFetch = (): ModuleInfoActions => ({
  type: MODULE_INFO_FETCH,
    isFetching: false,
    fetchStatus: `start fetching... ${(new Date()).toLocaleString()}`
});
export const moduleInfoFetchCancel = (): ModuleInfoActions => (
  {
    type: MODULE_INFO_FETCH_CANCEL,
    isFetching: false,
    fetchStatus: 'user cancelled'

}
);
export const moduleInfoFetchFulfilled = (moduleInfo: IModuleInfo, lastUpdate: Date): ModuleInfoActions => ({
  type: MODULE_INFO_FETCH_FULFILLED,
  moduleInfo: moduleInfo,
  lastUpdate: lastUpdate,
    isFetching: false,
    fetchStatus: `Results from ${(new Date()).toLocaleString()}`
});

export const moduleInfoFetchRejected = (err: any): ModuleInfoActions => {
    return {
        type: MODULE_INFO_FETCH_REJECTED,
        err: err,
        isFetching: false,
        fetchStatus: `errored: ${err.message}`
    }
};

export const actions = {
  moduleInfoFetch,
  moduleInfoFetchCancel,
  moduleInfoFetchFulfilled,
  moduleInfoFetchRejected
};
