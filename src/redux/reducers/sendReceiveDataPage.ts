import {
    key,
    SEND_RECEIVE_DATA_PAGE_SET_LAYOUTS,
    SendReceiveDataPageActions,
    ISendReceiveDataPageState
} from "../types/sendReceiveDataPage";
import {RootState} from "./index";
import {ILayoutConfigured} from "../types/home";

export const sendReceiveDataPageSelectors = {
  layouts: (state: RootState | any): ILayoutConfigured => state[key].layouts,
};

const initialState = {
  layouts: {
    lg: [], md: [], sm: [], xs: [], xxs: [],
  }
};

export default function sendReceiveDataPageReducer(state = initialState, action: SendReceiveDataPageActions): ISendReceiveDataPageState {
  switch (action.type) {
    case SEND_RECEIVE_DATA_PAGE_SET_LAYOUTS:
      return {
        ...state,
        layouts: action.layouts
      };
    default:
      return state;
  }
}
