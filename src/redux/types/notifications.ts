// import {Component} from "react";
import {Action} from "redux";

export interface INotification {
    title?: string,
    message: JSX.Element | string,
    variant: string,
    autoHide?: number
}

// unique key namespace used by combineReducers.
// By convention it will match the directory structure to
// make it easy to locate the src.
// Also action types will prefix with the capitalized version
export const key = 'notifications';

// action type constants
export const ADD_NOTIFICATION = 'ADD_NOTIFICATION';
export const SHIFT_NOTIFICATION = 'SHIFT_NOTIFICATION';
export const GET_CURRENT_NOTIFICATION = 'GET_CURRENT_NOTIFICATION';

export const actionTypes = {
    ADD_NOTIFICATION,
    SHIFT_NOTIFICATION,
    GET_CURRENT_NOTIFICATION
};

export interface INotificationsState {
    current: INotification | null,
    queue: INotification[]
}

class AddNotification implements Action {
    readonly type = ADD_NOTIFICATION;
    constructor(public notification: INotification) {}
}

class ShiftNotification implements Action {
    readonly type = SHIFT_NOTIFICATION;
}

class GetCurrentNotification implements Action {
    readonly type = GET_CURRENT_NOTIFICATION;
}

export type NotificationsActions = AddNotification | ShiftNotification | GetCurrentNotification
