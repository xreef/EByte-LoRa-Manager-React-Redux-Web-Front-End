import {
    key,
    MODULE_INFO_FETCH,
    MODULE_INFO_FETCH_CANCEL,
    MODULE_INFO_FETCH_FULFILLED,
    MODULE_INFO_FETCH_REJECTED,
    IModuleInfoState
} from "../types/moduleInfo";
import {ModuleInfoActions, IModuleInfo} from "../types/moduleInfo";
import {RootState} from "./index";

export const moduleInfoSelectors = {
  moduleInfo: (state: RootState | any): IModuleInfo => state[key].moduleInfo,
  lastUpdate: (state: RootState): Date | undefined => state.moduleInfo.lastUpdate,
  fetchStatus: (state: RootState): string | undefined => state[key].fetchStatus
};

// export const moduleInfoInitialState: IModuleInfo = {
//     frequency: undefined,
//     version: undefined,
//     features: undefined
// }

const initialState: IModuleInfoState = {
    // moduleInfo?: undefined,
    lastUpdate: undefined,

    isFetching: true,
    fetchStatus: `fetching... ${(new Date()).toLocaleString()}`,

    errors: [],
    valid: false
};

export default function moduleInfoReducer(state = initialState, action: ModuleInfoActions): IModuleInfoState {
  switch (action.type) {
    case MODULE_INFO_FETCH:
      return {
        ...state,
        isFetching: true,
        fetchStatus: `fetching... ${(new Date()).toLocaleString()}`,
        moduleInfo: undefined,
        lastUpdate: undefined
      };
    case MODULE_INFO_FETCH_FULFILLED:
      return {
        ...state,
        moduleInfo: action.moduleInfo,
        isFetching: false,
        fetchStatus: `Results from ${(new Date()).toLocaleString()}`,
        lastUpdate: action.lastUpdate,
        valid: true
      };
    case MODULE_INFO_FETCH_REJECTED:
        // debugger
      return {
        ...state,
        isFetching: false,
        fetchStatus: `errored: ${action.err.message}`,
        errors: [action.err.message]
      };
    case MODULE_INFO_FETCH_CANCEL:
      return {
        ...state,
        isFetching: false,
        fetchStatus: 'user cancelled'
      };
    default:
      return state;
  }
}
