import React from 'react'
import { createLogic } from 'redux-logic';
// import moment from 'moment';


import { MICROCONTROLLER_ADRESS, CONFIGURATION_ENDPOINT } from '../config';


import {
    CONFIGURATION_FETCH, CONFIGURATION_FETCH_CANCEL,
    CONFIGURATION_FETCH_REJECTED, IConfiguration //, CONFIGURATION_FETCH_FULFILLED
} from "../types/configuration";
import {addNotification, configurationFetchFulfilled, configurationFetchRejected} from "../actions";
import {FormattedMessage} from "react-intl";

// const delay = 10; // 4s delay for interactive use of cancel/take latest

const configurationFetchLogic = createLogic({
  type: CONFIGURATION_FETCH,
  cancelType: CONFIGURATION_FETCH_CANCEL,
  latest: true, // take latest only
  debounce: 1000,

  processOptions: {
    dispatchReturn: true,
    // successType: CONFIGURATION_FETCH_FULFILLED, //configurationFetchFulfilled, // CONFIGURATION_FETCH_FULFILLED, //
    // failType: CONFIGURATION_FETCH_REJECTED, //configurationFetchRejected // CONFIGURATION_FETCH_REJECTED //configurationFetchRejecte
  },

  process({ httpClient, getState, action }, dispatch, done) {
    return httpClient.get(`http://${MICROCONTROLLER_ADRESS}/${CONFIGURATION_ENDPOINT}`)
      .then((resp: any) => {
        // const lastUpdate = new Date(moment(resp.data.lastUpdate, 'DD/MM/YYYY HH:mm:ss').valueOf());
        const data = resp.data;

        const conf:IConfiguration = data.configuration;
        return { configuration: conf, lastUpdate: new Date() };
      })
        .then((payload: any) =>{
            if (payload.configuration && payload.configuration.CHAN>=0 && payload.configuration.CHAN<41){
                dispatch(configurationFetchFulfilled(payload.configuration, payload.lastUpdate));
            }else{
                dispatch(addNotification({ message: <FormattedMessage id="configuration.load.failed" />, variant: 'warning', autoHide: 0 }));
            }
        }
        ).catch(reason => {
            dispatch(configurationFetchRejected(reason))
        })
        .then(() => done());
  }
});

export default [
  configurationFetchLogic
];
