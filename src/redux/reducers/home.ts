import {
    key,
    HOME_SET_LAYOUTS,
    HOME_ADD_ELEMENT,
    HOME_REMOVE_ELEMENT,
    ILayout,
    HomeActions,
    ILayoutConfigured,
    ILayoutElement
} from "../types/home";
import boxes from '../../layouts/box/boxes';
import guid from '../../utils/math/guid';
import {RootState} from "./index";

export const homeSelectors = {
  layouts: (state: RootState): ILayoutConfigured => state[key].layouts,
  elements: (state: RootState): ILayoutElement[] => state[key].elements
};

const initialState: ILayout = {
  layouts: {
    lg: [], md: [], sm: [], xs: [], xxs: [],
  },
  elements: []
};

export default function homeReducer(state = initialState, action: HomeActions): ILayout {
  switch (action.type) {
    case HOME_SET_LAYOUTS:
      return {
        ...state,
        layouts: action.layouts
      };
    case HOME_ADD_ELEMENT:
      const gu = guid();
      const elemToAdd = { i: gu, ...{ ...boxes[action.element] } };
      // elemToAdd.additionalInfo.id = gu;

      return {
        ...state,
        elements: [...state.elements, elemToAdd]
      };
    case HOME_REMOVE_ELEMENT:
      const elem = [...state.elements].filter(elemToSel => elemToSel.additionalInfo.boxType === action.element)[0];

      const layouts = { ...state.layouts };
      Object.keys(layouts).forEach((keyLayout) => {
        layouts[keyLayout] = layouts[keyLayout].filter(elemToFilter => elemToFilter.i !== elem.i);
      });

      return {
        ...state,
        layouts,
        elements: [...state.elements].filter(elemL => elemL.i !== elem.i)
      };
    default:
      return state;
  }
}
