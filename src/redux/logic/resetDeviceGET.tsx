import React from 'react'
import { createLogic } from 'redux-logic';
// import moment from 'moment';


import { MICROCONTROLLER_ADRESS, RESET_DEVICE_ENDPOINT } from '../config';


import {
    RESET_DEVICE_FETCH, RESET_DEVICE_FETCH_CANCEL,
    RESET_DEVICE_FETCH_REJECTED, IStatus//, RESET_DEVICE_FETCH_FULFILLED
} from "../types/resetDevice";
import {addNotification, resetDeviceFetchFulfilled, resetDeviceFetchRejected} from "../actions";
import {FormattedMessage} from "react-intl";

// const delay = 10; // 4s delay for interactive use of cancel/take latest

const resetDeviceFetchLogic = createLogic({
  type: RESET_DEVICE_FETCH,
  cancelType: RESET_DEVICE_FETCH_CANCEL,
  latest: true, // take latest only
  debounce: 1000,

  processOptions: {
    dispatchReturn: true,
    // successType: RESET_DEVICE_FETCH_FULFILLED, //resetDeviceFetchFulfilled, // RESET_DEVICE_FETCH_FULFILLED, //
    // failType: RESET_DEVICE_FETCH_REJECTED, //resetDeviceFetchRejected // RESET_DEVICE_FETCH_REJECTED //resetDeviceFetchRejecte
  },

  process({ httpClient, getState, action }, dispatch, done) {
    return httpClient.get(`http://${MICROCONTROLLER_ADRESS}/${RESET_DEVICE_ENDPOINT}`)
      .then((resp: any) => {
        // const lastUpdate = new Date(moment(resp.data.lastUpdate, 'DD/MM/YYYY HH:mm:ss').valueOf());
        const data = resp.data;

        const conf:IStatus = data.status;
        return { status: conf, lastUpdate: new Date() };
      })
        .then((payload: any) =>{
                if (!payload.status.error) {
                    dispatch(addNotification({
                        message: <FormattedMessage id="resetdevice.message.success"/>,
                        variant: 'success',
                        autoHide: 0
                    }));
                    dispatch(resetDeviceFetchFulfilled(payload.status, payload.lastUpdate));
                }else{
                    dispatch(resetDeviceFetchRejected({message: 'Reset: ' + payload.status.description}))

                }
        }
        ).catch(reason => {
            dispatch(resetDeviceFetchRejected(reason))
        })
        .then(() => done());
  }
});

export default [
  resetDeviceFetchLogic
];
