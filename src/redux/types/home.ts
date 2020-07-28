
// unique key namespace used by combineReducers.
// By convention it will match the directory structure to
// make it easy to locate the src.
// Also action types will prefix with the capitalized version
import {Action} from "redux";
// import {CONFIGURATION_FIELD_INVALID, IConfiguration} from "./configuration";
import {INotification} from "./notifications";

export const key = 'home';

// action type constants
export const HOME_SET_LAYOUTS = 'HOME_SET_LAYOUTS';
export const HOME_ADD_ELEMENT = 'HOME_ADD_ELEMENT';
export const HOME_REMOVE_ELEMENT = 'HOME_REMOVE_ELEMENT';

export const actionTypes = {
    HOME_SET_LAYOUTS,
    HOME_ADD_ELEMENT,
    HOME_REMOVE_ELEMENT
};
//     "i": string,
export interface ILayoutElement  {
    i?: string,
    id?: string,
    additionalInfo: any,
    resize: boolean,
    close: boolean,
    minW: number,
    maxW: number,
    minH: number,
    maxH: number,
    w: number,
    h: number,
    x?: number,
    y?: number | null
}

export interface ILayoutConfigured {
    [key: string]: ILayoutElement[]
    // ,
    // [md: string]: ILayoutElement[],
    // [sm: string]: ILayoutElement[],
    // [xs: string]: ILayoutElement[],
    // [xxs: string]: ILayoutElement[],
}

export interface ILayout {
    layouts: ILayoutConfigured,
    elements: ILayoutElement[]
}

class SetHomeLayout implements Action {
    readonly type = HOME_SET_LAYOUTS;
    notification?: INotification;
    constructor(public layouts: ILayoutConfigured) {}
}

class AddElementToHome implements Action {
    readonly type = HOME_ADD_ELEMENT;
    constructor(public element: any) {}
}

class RemoveElementFromHome implements Action {
    readonly type = HOME_REMOVE_ELEMENT;
    constructor(public elementSetPushNotificationSupported: ILayoutElement) {}
}

export type HomeActions = SetHomeLayout | AddElementToHome | RemoveElementFromHome;
