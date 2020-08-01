import {FormattedMessage} from 'react-intl';
import React from 'react';
import {
    ADD_NOTIFICATION,
    SHIFT_NOTIFICATION,
    // GET_CURRENT_NOTIFICATION,
    NotificationsActions, INotificationsState, INotification
} from "../types/notifications";
import {HOME_ADD_ELEMENT, HOME_REMOVE_ELEMENT, HOME_SET_LAYOUTS, HomeActions} from "../types/home";
import {CONFIGURATION_ADD_FAILED, CONFIGURATION_FETCH_REJECTED, ConfigurationActions} from "../types/configuration";
// import { DAILY_SET_LAYOUTS } from '../actions/daily';
// import { HISTORICAL_SET_LAYOUTS } from '../actions/historical';
// import { INVERTER_INFO_STATE_SET_LAYOUTS } from '../actions/inverterInfoState';
// import { HOME_ADD_ELEMENT, HOME_REMOVE_ELEMENT, HOME_SET_LAYOUTS } from '../actions/home';

const initialState: INotificationsState = {
    current: null,
    queue: []
}

export default function notificationsReducer(state = initialState, action: NotificationsActions | HomeActions | ConfigurationActions): INotificationsState {
    let notification = null;
    switch (action.type) {
        case HOME_SET_LAYOUTS:
            // case DAILY_SET_LAYOUTS:
            // case HISTORICAL_SET_LAYOUTS:
            // case INVERTER_INFO_STATE_SET_LAYOUTS:
            if (notification === null) notification = {
                message: <FormattedMessage id="layouts.set"/>,
                variant: 'info'
            };

            const notificaHomeSetLayout: INotification = {...{autoHide: 2200}, ...notification};

            if (state.current) {
                return {
                    ...state,
                    queue: [...state.queue, notificaHomeSetLayout]
                };
            }
            return {
                ...state,
                current: notificaHomeSetLayout
            };
        case HOME_ADD_ELEMENT:
            if (notification === null) notification = {
                message: <FormattedMessage id="layouts.home.add"/>,
                variant: 'info'
            };
            const notificaHomeAdd: INotification = {...{autoHide: 2200}, ...notification};

            if (state.current) {
                return {
                    ...state,
                    queue: [...state.queue, notificaHomeAdd]
                };
            }
            return {
                ...state,
                current: notificaHomeAdd
            };
        case HOME_REMOVE_ELEMENT:
            if (notification === null) notification = {
                message: <FormattedMessage id="layouts.home.remove"/>,
                variant: 'info'
            };
            const notificaHome: INotification = {...{autoHide: 2200}, ...notification};

            if (state.current) {
                return {
                    ...state,
                    queue: [...state.queue, notificaHome]
                };
            }
            return {
                ...state,
                current: notificaHome
            };
        case CONFIGURATION_FETCH_REJECTED:
        case CONFIGURATION_ADD_FAILED:
            const msg: string = action.err.message;
            const notificaCFR = {...{autoHide: 0}, message: msg,  variant: 'error'};
            if (state.current) {
                return {
                    ...state,
                    queue: [...state.queue, notificaCFR]
                };
            }
            return {
                ...state,
                current: notificaCFR
            };

        case ADD_NOTIFICATION:
            const notifica = {...{autoHide: 2200}, ...action.notification};
            if (state.current) {
                return {
                    ...state,
                    queue: [...state.queue, notifica]
                };
            }
            return {
                ...state,
                current: notifica
            };

        case SHIFT_NOTIFICATION:
            let elem = null;
            if (state.queue.length > 0) {
                elem = state.queue.shift();
            }
            return {
                queue: [...state.queue],
                current: (elem) ? elem : null
            };
        default:
            return state;
    }
};
