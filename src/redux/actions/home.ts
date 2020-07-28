

// action creators
import {
    HOME_SET_LAYOUTS,
    HOME_ADD_ELEMENT,
    HOME_REMOVE_ELEMENT,
    // ILayout,
    HomeActions,
    ILayoutElement, ILayoutConfigured
} from "../types/home";

export const setHomeLayout = (layouts: ILayoutConfigured): HomeActions => ({
  type: HOME_SET_LAYOUTS,
  layouts
});

export const addElementToHome = (element: any): HomeActions => ({
  type: HOME_ADD_ELEMENT,
  element
});

export const removeElementFromHome = (elementSetPushNotificationSupported: ILayoutElement): HomeActions => ({
  type: HOME_REMOVE_ELEMENT,
  elementSetPushNotificationSupported: elementSetPushNotificationSupported
});

export const actions = {
  setHomeLayout,
  addElementToHome,
  removeElementFromHome
};
