import {
    key,
    CONFIGURATION_PAGE_SET_LAYOUTS,
    ConfigurationPageActions,
    IConfigurationPageState
} from "../types/configurationPage";
import {RootState} from "./index";
import {ILayoutConfigured} from "../types/home";

export const configurationPageSelectors = {
  layouts: (state: RootState | any): ILayoutConfigured => state[key].layouts,
};

const initialState = {
  layouts: {
    lg: [], md: [], sm: [], xs: [], xxs: [],
  }
};

export default function configurationPageReducer(state = initialState, action: ConfigurationPageActions): IConfigurationPageState {
  switch (action.type) {
    case CONFIGURATION_PAGE_SET_LAYOUTS:
      return {
        ...state,
        layouts: action.layouts
      };
    default:
      return state;
  }
}
