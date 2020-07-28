import {
    CONFIGURATION_FETCH,
    CONFIGURATION_FETCH_CANCEL,
    CONFIGURATION_FETCH_FULFILLED,
    CONFIGURATION_FETCH_REJECTED,
    CONFIGURATION_FIELD_UPDATED,
    CONFIGURATION_FIELD_INVALID,
    CONFIGURATION_ADD,
    CONFIGURATION_ADD_SUCCESS,
    CONFIGURATION_ADD_FAILED, IConfiguration, ConfigurationActions
} from "../types/configuration";


// action creators
export const configurationFetch = (): ConfigurationActions => ({
  type: CONFIGURATION_FETCH,
    isFetching: false,
    fetchStatus: `start fetching... ${(new Date()).toLocaleString()}`
});
export const configurationFetchCancel = (): ConfigurationActions => (
  {
    type: CONFIGURATION_FETCH_CANCEL,
    isFetching: false,
    fetchStatus: 'user cancelled'

}
);
export const configurationFetchFulfilled = (configuration: IConfiguration, lastUpdate: Date): ConfigurationActions => ({
  type: CONFIGURATION_FETCH_FULFILLED,
  configuration: configuration,
  lastUpdate: lastUpdate,
    isFetching: false,
    fetchStatus: `Results from ${(new Date()).toLocaleString()}`
});

export const configurationFetchRejected = (err: any): ConfigurationActions => ({
  type: CONFIGURATION_FETCH_REJECTED,
  err,
  isFetching: false,
  fetchStatus: `errored: ${err.message}`
});

// action creators
export const configurationFieldUpdated = (configuration: IConfiguration, lastUpdate: Date): ConfigurationActions => ({
  type: CONFIGURATION_FIELD_UPDATED,
  configuration: configuration,
  lastUpdate: lastUpdate,
    isFetching: false
});

export const configurationFieldInvalid = (errors: string[], configuration: IConfiguration): ConfigurationActions => ({
  type: CONFIGURATION_FIELD_INVALID,
    errors,
    configuration,
    isFetching: false,
    fetchStatus: 'field invalid'

});

export const configurationAdd = (evt: Event): ConfigurationActions => {
  evt.preventDefault();
  return { type: CONFIGURATION_ADD };
};

export const configurationAddSuccess = (configuration: IConfiguration): ConfigurationActions => ({
  type: CONFIGURATION_ADD_SUCCESS,
    configuration: configuration
});

export const configurationAddFailed = (err: Error): ConfigurationActions => ({
  type: CONFIGURATION_ADD_FAILED,
  err
});

export const actions = {
  configurationFieldUpdated,
  configurationFieldInvalid,
  // configurationAdd,
  configurationAddSuccess,
  configurationAddFailed,

  configurationFetch,
  configurationFetchCancel,
  configurationFetchFulfilled,
  configurationFetchRejected
};
