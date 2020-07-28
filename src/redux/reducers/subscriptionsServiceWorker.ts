import {
    ISubscriptionsServiceWorkers,
    SET_PUSH_NOTIFICATION_IS_SUPPORTED,
    SET_SUBSCRIPTION_SERVICE_WORKER,
    SET_USER_SUBSCRIBED_TO_PUSH_NOTIFICATION, SubscriptionsServiceWorkerActions
} from "../types/subscriptionsServiceWorker";

const initialState: ISubscriptionsServiceWorkers = {
    isServiceWorkerSubscribed: false,
    registration: null,
    isPushNotificationSupported: false,
    isUserSubscribedToPushNotification: false
};

export default function subscriptionsServiceWorkerReducer (state = initialState, action: SubscriptionsServiceWorkerActions):ISubscriptionsServiceWorkers {
  switch (action.type) {
    case SET_SUBSCRIPTION_SERVICE_WORKER:
      return {
        ...state,
        isServiceWorkerSubscribed: action.isServiceWorkerSubscribed,
        registration: action.registration
      };
    case SET_PUSH_NOTIFICATION_IS_SUPPORTED:
      return {
        ...state,
        isPushNotificationSupported: action.isPushNotificationSupported
      };
    case SET_USER_SUBSCRIBED_TO_PUSH_NOTIFICATION:
      return {
        ...state,
        isUserSubscribedToPushNotification: action.isUserSubscribedToPushNotification
      };
    default:
      return state;
  }
};
