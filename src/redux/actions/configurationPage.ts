
// unique key namespace used by combineReducers.
// By convention it will match the directory structure to
// make it easy to locate the src.
// Also action types will prefix with the capitalized version
import {ILayoutConfigured} from "../types/home";
import {CONFIGURATION_PAGE_SET_LAYOUTS, ConfigurationPageActions} from "../types/configurationPage";


// action creators
export const setConfigurationPageLayout =  (layouts: ILayoutConfigured): ConfigurationPageActions => ({
  type: CONFIGURATION_PAGE_SET_LAYOUTS,
  layouts
});

export const actions = {
    setConfigurationPageLayout
};
