import { createLogic } from 'redux-logic';

import {
    DEVICE_MESSAGES_FIELD_UPDATED, DEVICE_MESSAGES_SEND_BROADCAST, MESSAGE_SIZE, //key, DeviceMessagesActions
} from "../types/deviceMessages";
import {
    deviceMessagesFieldInvalid,
    deviceMessagesSendBroadcastSuccess, deviceMessagesSendBroadcastFailed, addNotification, /*deviceMessagesFieldUpdated*/
} from "../actions";
// import {
//   addNotification
// } from '../actions/notifications';
import { deviceMessagesSelectors } from '../reducers/deviceMessages';
import { configurationSelectors } from '../reducers/configuration';
import { BROADCAST_TRANSMISSION_ENDPOINT, MICROCONTROLLER_ADRESS } from '../config';
import {FormattedMessage} from "react-intl";
import React from "react";
import {IConfiguration} from "../types/configuration";
import {RootState} from "../reducers";
// import {RootState} from "../reducers";


/**
 * Core business validation code, extracted so it can be used
 * in multiple places and even tested independently
 * @returns errors array
 */
export function validateFields(CHAN: number | undefined, deviceMessage: string, configuration: IConfiguration | undefined) {
  const errors = [];
  // if (data.server && (data.server.isStatic === undefined || data.server.isStatic === null)) { errors.push('Server is required!'); }
  // if (data.emailNotification && !data.serverSMTP) { errors.push('SMTP deviceMessages is required'); }
  // if (data.serverSMTP && (!data.serverSMTP.from || !data.serverSMTP.password || !data.serverSMTP.port || !data.serverSMTP.server || !data.serverSMTP.login)) { errors.push('SMTP deviceMessages not correct'); }
    if (deviceMessage.length==0) errors.push('Message is empty');
    if (deviceMessage.length>=MESSAGE_SIZE) errors.push('Max message size is ' + MESSAGE_SIZE + 'byte');
    return errors;
}

/**
 * Validate state once again and if valid
 * use axios to post to a server.
 * Dispatch DEVICE_MESSAGES_SEND_BROADCAST_SUCCESS or DEVICE_MESSAGES_SEND_BROADCAST_FAILED
 * based on the response from the server.
 * Note: axios was injected as httpClient in
 * src/configureStore.js
 */
export const deviceMessagesSendBroadcastLogic = createLogic({
  type: DEVICE_MESSAGES_SEND_BROADCAST,
  validate({ httpClient, action, getState }, allow, reject) {
    const state: RootState = getState();

    const errors = validateFields(action.CHAN,
        action.deviceMessage,
        configurationSelectors.configuration(state)
    );
    if (!errors.length) {
      allow(action); // no errors, let DEVICE_MESSAGES_SEND_BROADCAST go through
    } else { // still has errors
      // it really should never get here since user shouldn't
      // be able to submit until valid.
      // Errors should already be on screen so just reject silently
      reject(deviceMessagesFieldInvalid(errors));
    }
  },

  // if it passed the validation hook then this will be executed
  process({ httpClient, getState, action}, dispatch, done) {
      const dataToUpdate = {CHAN: action.CHAN, "message": action.deviceMessage};
    httpClient.post(`http://${MICROCONTROLLER_ADRESS}/${BROADCAST_TRANSMISSION_ENDPOINT}`, dataToUpdate)
      .then(resp => resp.data) // new user created is returned
      .then((respData) => {
          dispatch(addNotification({ message: <FormattedMessage  id="deviceMessages.broadcast.send.success"
                                                                 values={
                                                         {
                                                             creturn: <br/>,
                                                            CHAN: action.CHAN,
                                                            message: <span><i><br/>{action.deviceMessage}</i></span>
                                                         }
                                                                 } />, variant: 'success' }));

          dispatch(deviceMessagesSendBroadcastSuccess(action.CHAN, action.deviceMessage));
      })
      .catch(err => {
        console.error(err); // might be a render err
        dispatch(deviceMessagesSendBroadcastFailed(err));
        // dispatch(addNotification({ message: <FormattedMessage id="deviceMessages.save.failed" values={{ err: err.toLocaleString(), br: <br /> }} />, variant: 'error', autoHide: false }));
      })
      .then(() => done()); // call when done dispatching
  }
});

export default [
  deviceMessagesSendBroadcastLogic
];
