import {
    ADD_NOTIFICATION,
    GET_CURRENT_NOTIFICATION,
    SHIFT_NOTIFICATION,
    INotification,
    NotificationsActions
} from "../types/notifications";


export const addNotification = (notification: INotification): NotificationsActions => ({
  type: ADD_NOTIFICATION,
  notification
});

export const shiftNotification = (): NotificationsActions => ({
  type: SHIFT_NOTIFICATION
});

export const getCurrentNotification = (): NotificationsActions => ({
  type: GET_CURRENT_NOTIFICATION
});

export const actions = {
    addNotification,
    shiftNotification,
    getCurrentNotification
}
