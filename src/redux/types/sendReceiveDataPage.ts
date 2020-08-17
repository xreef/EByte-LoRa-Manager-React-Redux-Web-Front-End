import {Action} from "redux";
import {INotification} from "./notifications";
import {ILayoutConfigured, ILayoutElement} from "./home";

export const key = 'sendReceiveDataPage';

// action type constants
export const SEND_RECEIVE_DATA_PAGE_SET_LAYOUTS = 'SEND_RECEIVE_DATA_PAGE_SET_LAYOUTS';

export const actionTypes = {
    SEND_RECEIVE_DATA_PAGE_SET_LAYOUTS
};

export interface ISendReceiveDataPageState {
    layouts: ILayoutConfigured
}

class SetSendReceiveDataPageLayout implements Action {
    readonly type = SEND_RECEIVE_DATA_PAGE_SET_LAYOUTS;
    constructor(public layouts: ILayoutConfigured) {}
}

export type SendReceiveDataPageActions = SetSendReceiveDataPageLayout;
