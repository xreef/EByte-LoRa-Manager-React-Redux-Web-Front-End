import {Action} from "redux";
import {INotification} from "./notifications";
import {ILayoutConfigured, ILayoutElement} from "./home";

export const key = 'configurationPage';

// action type constants
export const CONFIGURATION_PAGE_SET_LAYOUTS = 'CONFIGURATION_PAGE_SET_LAYOUTS';

export const actionTypes = {
    CONFIGURATION_PAGE_SET_LAYOUTS
};

export interface IConfigurationPageState {
    layouts: ILayoutConfigured
}

class SetConfigurationPageLayout implements Action {
    readonly type = CONFIGURATION_PAGE_SET_LAYOUTS;
    constructor(public layouts: ILayoutConfigured) {}
}

export type ConfigurationPageActions = SetConfigurationPageLayout;
