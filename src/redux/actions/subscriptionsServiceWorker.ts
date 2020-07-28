import {
    SET_SUBSCRIPTION_SERVICE_WORKER,
    SET_PUSH_NOTIFICATION_IS_SUPPORTED,
    SET_USER_SUBSCRIBED_TO_PUSH_NOTIFICATION, SubscriptionsServiceWorkerActions
} from "../types/subscriptionsServiceWorker";


export const setServiceWorkerSubscription = (isServiceWorkerSubscribed: boolean, registration: any): SubscriptionsServiceWorkerActions => ({
    type: SET_SUBSCRIPTION_SERVICE_WORKER,
    isServiceWorkerSubscribed: isServiceWorkerSubscribed,
    registration: registration
});

export const setPushNotificationSupported = (isPushNotificationSupported: boolean): SubscriptionsServiceWorkerActions => ({
    type: SET_PUSH_NOTIFICATION_IS_SUPPORTED,
    isPushNotificationSupported: isPushNotificationSupported
});

export const setUserSubscribedToPushNotification = (isUserSubscribedToPushNotification: boolean): SubscriptionsServiceWorkerActions => ({
    type: SET_USER_SUBSCRIBED_TO_PUSH_NOTIFICATION,
    isUserSubscribedToPushNotification: isUserSubscribedToPushNotification
});

export const actions = {
    setServiceWorkerSubscription,
    setPushNotificationSupported,
    setUserSubscribedToPushNotification
}

