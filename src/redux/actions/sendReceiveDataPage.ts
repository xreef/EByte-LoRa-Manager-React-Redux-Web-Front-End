
// unique key namespace used by combineReducers.
// By convention it will match the directory structure to
// make it easy to locate the src.
// Also action types will prefix with the capitalized version
import {ILayoutConfigured} from "../types/home";
import {SEND_RECEIVE_DATA_PAGE_SET_LAYOUTS, SendReceiveDataPageActions} from "../types/sendReceiveDataPage";


// action creators
export const setSendReceiveDataPageLayout =  (layouts: ILayoutConfigured): SendReceiveDataPageActions => ({
  type: SEND_RECEIVE_DATA_PAGE_SET_LAYOUTS,
  layouts
});

export const actions = {
    setSendReceiveDataPageLayout
};
