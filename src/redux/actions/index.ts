import { setVersion } from './version';

import { configurationFetch, configurationFetchCancel, configurationFetchFulfilled,
    configurationFetchRejected, configurationFieldUpdated, configurationFieldInvalid,
    configurationAdd, configurationAddSuccess, configurationAddFailed } from "./configuration";

import { moduleInfoFetch, moduleInfoFetchCancel, moduleInfoFetchFulfilled,
    moduleInfoFetchRejected } from "./moduleInfo";


import { addNotification, shiftNotification, getCurrentNotification } from "./notifications";

import { setServiceWorkerSubscription, setUserSubscribedToPushNotification,
            setPushNotificationSupported } from "./subscriptionsServiceWorker";

import {    serverStateFetch, serverStateWIFIStrenghtFetchFulfilled, serverStateBatteryFetchFulfilled,
            serverStateFetchCancel, serverStateFetchFulfilled, serverStateFetchRejected } from "./serverState";

import { webSocketOpen, webSocketClose, webSocketError, webSocketMessage, webSocketSendMessage,
        webSocketConnect, webSocketDisconnect } from "./webSocket";

import { setHomeLayout,removeElementFromHome, addElementToHome } from "./home";
import {
    deviceMessagesSendTransparent,
    deviceMessagesSendTransparentFailed,
    deviceMessagesSendTransparentSuccess,
    deviceMessagesFieldInvalid,
    deviceMessagesFieldUpdated,
    deviceMessagesSendBroadcast,
    deviceMessagesSendBroadcastSuccess,
    deviceMessagesSendBroadcastFailed,
    deviceMessagesSendFixed,
    deviceMessagesSendFixedSuccess,
    deviceMessagesSendFixedFailed
} from "./deviceMessages";

import { setConfigurationPageLayout } from "./configurationPage";
import { setSendReceiveDataPageLayout } from "./sendReceiveDataPage";

export {
    setVersion,

    configurationFetch, configurationFetchCancel, configurationFetchFulfilled,
    configurationFetchRejected, configurationFieldUpdated, configurationFieldInvalid,
    configurationAdd, configurationAddSuccess, configurationAddFailed,

    moduleInfoFetch, moduleInfoFetchCancel, moduleInfoFetchFulfilled,
    moduleInfoFetchRejected,

    deviceMessagesFieldUpdated,
    deviceMessagesFieldInvalid,
    deviceMessagesSendTransparent,
    deviceMessagesSendTransparentSuccess,
    deviceMessagesSendTransparentFailed,
    deviceMessagesSendBroadcast,
    deviceMessagesSendBroadcastSuccess,
    deviceMessagesSendBroadcastFailed,
    deviceMessagesSendFixed,
    deviceMessagesSendFixedSuccess,
    deviceMessagesSendFixedFailed,



    addNotification, shiftNotification, getCurrentNotification,

    setServiceWorkerSubscription, setUserSubscribedToPushNotification, setPushNotificationSupported,

    serverStateFetch, serverStateWIFIStrenghtFetchFulfilled, serverStateBatteryFetchFulfilled,
    serverStateFetchCancel, serverStateFetchFulfilled, serverStateFetchRejected,

    webSocketOpen, webSocketClose, webSocketError, webSocketMessage, webSocketSendMessage,
    webSocketConnect, webSocketDisconnect,

    setHomeLayout,removeElementFromHome, addElementToHome,

    setConfigurationPageLayout,

    setSendReceiveDataPageLayout
};
