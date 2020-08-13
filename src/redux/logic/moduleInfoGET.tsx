import React from 'react'
import { createLogic } from 'redux-logic';
// import moment from 'moment';


import { MICROCONTROLLER_ADRESS, MODULE_INFO_ENDPOINT } from '../config';


import {
    MODULE_INFO_FETCH, MODULE_INFO_FETCH_CANCEL,
    MODULE_INFO_FETCH_REJECTED, IModuleInfo, frequencyFromModuleInfo //, MODULE_INFO_FETCH_FULFILLED
} from "../types/moduleInfo";
import {addNotification, moduleInfoFetchFulfilled, moduleInfoFetchRejected} from "../actions";
import {FormattedMessage} from "react-intl";

// const delay = 10; // 4s delay for interactive use of cancel/take latest

const moduleInfoFetchLogic = createLogic({
  type: MODULE_INFO_FETCH,
  cancelType: MODULE_INFO_FETCH_CANCEL,
  latest: true, // take latest only
  debounce: 1000,

  processOptions: {
    dispatchReturn: true,
    // successType: MODULE_INFO_FETCH_FULFILLED, //moduleInfoFetchFulfilled, // MODULE_INFO_FETCH_FULFILLED, //
    // failType: MODULE_INFO_FETCH_REJECTED, //moduleInfoFetchRejected // MODULE_INFO_FETCH_REJECTED //moduleInfoFetchRejecte
  },

  process({ httpClient, getState, action }, dispatch, done) {
    return httpClient.get(`http://${MICROCONTROLLER_ADRESS}/${MODULE_INFO_ENDPOINT}`)
      .then((resp: any) => {
        // const lastUpdate = new Date(moment(resp.data.lastUpdate, 'DD/MM/YYYY HH:mm:ss').valueOf());
        const data = resp.data;

        const conf:IModuleInfo = data.moduleInfo;
        return { moduleInfo: conf, lastUpdate: new Date() };
      })
        .then((payload: any) =>{
            if (Object.keys(frequencyFromModuleInfo).indexOf(payload.moduleInfo.frequency)>-1){
            // if (payload.moduleInfo.frequency){
                dispatch(moduleInfoFetchFulfilled(payload.moduleInfo, payload.lastUpdate));
            }else{
                dispatch(addNotification({ message: <FormattedMessage id="moduleInfo.load.failed" />, variant: 'warning', autoHide: 0 }));
            }
        }
        ).catch(reason => {
            dispatch(moduleInfoFetchRejected(reason))
        })
        .then(() => done());
  }
});

export default [
  moduleInfoFetchLogic
];
