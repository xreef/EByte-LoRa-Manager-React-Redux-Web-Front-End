import {
    key,
    CONFIGURATION_FETCH,
    CONFIGURATION_FETCH_CANCEL,
    CONFIGURATION_FETCH_FULFILLED,
    CONFIGURATION_FETCH_REJECTED,
    CONFIGURATION_FIELD_UPDATED,
    CONFIGURATION_FIELD_INVALID,
    CONFIGURATION_ADD_SUCCESS,
    CONFIGURATION_ADD_FAILED,
    IConfigurationState,
    FORWARD_ERROR_CORRECTION_SWITCH,
    FIDEX_TRANSMISSION,
    IO_DRIVE_MODE,
    TRANSMISSION_POWER_100,
    WIRELESS_WAKE_UP_TIME,
    AIR_DATA_RATE,
    UART_BPS_TYPE,
    UART_PARITY
} from "../types/configuration";
import {ConfigurationActions, IConfiguration} from "../types/configuration";
import {RootState} from "./index";

export const selectors = {
  configuration: (state: RootState | any): IConfiguration => state[key].configuration,
  lastUpdate: (state: RootState): Date | undefined => state.configuration.lastUpdate,
  fetchStatus: (state: RootState): string | undefined => state[key].fetchStatus
};

const configurationInitialState: IConfiguration = {
    ADDH: 0,
    ADDL: 0,
    CHAN: 23,
    OPTION: {
              fec: FORWARD_ERROR_CORRECTION_SWITCH.FEC_1_ON,
              fixedTransmission: FIDEX_TRANSMISSION.FT_TRANSPARENT_TRANSMISSION,
              ioDriveMode: IO_DRIVE_MODE.IO_D_MODE_PUSH_PULLS_PULL_UPS,
              transmissionPower: TRANSMISSION_POWER_100.POWER_20,
              wirelessWakeupTime: WIRELESS_WAKE_UP_TIME.WAKE_UP_2000
    },
    SPED: {
        airDataRate: AIR_DATA_RATE.AIR_DATA_RATE_010_24,
        uartBaudRate: UART_BPS_TYPE.UART_BPS_9600,
        uartParity: UART_PARITY.MODE_00_8N1
    }
}

const initialState: IConfigurationState = {
    configuration: configurationInitialState,
    lastUpdate: undefined,

    isFetching: true,
    fetchStatus: `fetching... ${(new Date()).toLocaleString()}`,

    errors: [],
    valid: false,

    message: undefined
};

export default function configurationReducer(state = initialState, action: ConfigurationActions): IConfigurationState {
  switch (action.type) {
    case CONFIGURATION_FETCH:
      return {
        ...state,
        isFetching: true,
        fetchStatus: `fetching... ${(new Date()).toLocaleString()}`,
        configuration: configurationInitialState,
        lastUpdate: undefined
      };
    case CONFIGURATION_FETCH_FULFILLED:
      return {
        ...state,
        configuration: action.configuration,
        isFetching: false,
        fetchStatus: `Results from ${(new Date()).toLocaleString()}`,
        lastUpdate: action.lastUpdate,
        valid: true
      };
    case CONFIGURATION_FETCH_REJECTED:
      return {
        ...state,
        isFetching: false,
        fetchStatus: `errored: ${action.err}`
      };
    case CONFIGURATION_FETCH_CANCEL:
      return {
        ...state,
        isFetching: false,
        fetchStatus: 'user cancelled'
      };

    case CONFIGURATION_FIELD_UPDATED:
    { // updates dataToUpdate and clears errors
      return {
        ...state,
        configuration: action.configuration,
        errors: [],
        valid: true,
        message: ''
      };
    }
    case CONFIGURATION_FIELD_INVALID:
    { // updates dataToUpdate but displays errors
      return {
        ...state,
        configuration: action.configuration,
        errors: action.errors,
        valid: false,
        message: ''
      };
    }
    case CONFIGURATION_ADD_SUCCESS:
    { // add user to list, update message
      return {
        ...state,
        configuration: action.configuration,
        errors: [],
        valid: true,
        message: 'Update succesfully'
      };
    }
    case CONFIGURATION_ADD_FAILED:
    { // failed to add to server, display error
      const err = action.err;

      let errorsList: string[] = (state.errors)? [...state.errors]:[];
      errorsList.push(err);
      return {
        ...state,
        errors: errorsList,
        message: ''
      };
    }

    default:
      return state;
  }
}
