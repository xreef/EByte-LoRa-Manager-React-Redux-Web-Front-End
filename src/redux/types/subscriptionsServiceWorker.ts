import {Action} from "redux";
// import {INotification} from "./notifications";

export const key = 'subscriptionsServiceWorker';

// action type constants
export const SET_SUBSCRIPTION_SERVICE_WORKER = 'SET_SUBSCRIPTION_SERVICE_WORKER';
export const SET_PUSH_NOTIFICATION_IS_SUPPORTED = 'SET_PUSH_NOTIFICATION_IS_SUPPORTED';
export const SET_USER_SUBSCRIBED_TO_PUSH_NOTIFICATION = 'SET_USER_SUBSCRIBED_TO_PUSH_NOTIFICATION';

export const actionTypes = {
    SET_SUBSCRIPTION_SERVICE_WORKER,
    SET_PUSH_NOTIFICATION_IS_SUPPORTED,
    SET_USER_SUBSCRIBED_TO_PUSH_NOTIFICATION
};

export interface ISubscriptionsServiceWorkers {
    isServiceWorkerSubscribed: boolean,
    registration: any,
    isPushNotificationSupported: boolean,
    isUserSubscribedToPushNotification: boolean
}

class SetServiceWorkerSubscription implements Action {
    readonly type = SET_SUBSCRIPTION_SERVICE_WORKER;
    constructor(public isServiceWorkerSubscribed: boolean, public registration: any) {};
}

class SetPushNotificationSupported implements Action {
    readonly type = SET_PUSH_NOTIFICATION_IS_SUPPORTED;
    constructor(public isPushNotificationSupported: boolean) {};
}

class SetUserSubscribedToPushNotification implements Action {
    readonly type = SET_USER_SUBSCRIBED_TO_PUSH_NOTIFICATION;
    constructor(public isUserSubscribedToPushNotification: boolean) {}
}

export type SubscriptionsServiceWorkerActions = SetServiceWorkerSubscription | SetPushNotificationSupported | SetUserSubscribedToPushNotification;

