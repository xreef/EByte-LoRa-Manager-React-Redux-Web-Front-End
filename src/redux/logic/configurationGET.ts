import { createLogic } from 'redux-logic';
// import moment from 'moment';


import { MICROCONTROLLER_ADRESS, CONFIGURATION_ENDPOINT } from '../config';


import {
    CONFIGURATION_FETCH, CONFIGURATION_FETCH_CANCEL,
    CONFIGURATION_FETCH_REJECTED //, CONFIGURATION_FETCH_FULFILLED
} from "../types/configuration";
import {configurationFetchFulfilled} from "../actions";


// const delay = 10; // 4s delay for interactive use of cancel/take latest

const configurationFetchLogic = createLogic({
  type: CONFIGURATION_FETCH,
  cancelType: CONFIGURATION_FETCH_CANCEL,
  latest: true, // take latest only

  processOptions: {
    dispatchReturn: true,
    // successType: CONFIGURATION_FETCH_FULFILLED, //configurationFetchFulfilled, // CONFIGURATION_FETCH_FULFILLED, //
    failType: CONFIGURATION_FETCH_REJECTED, //configurationFetchRejected // CONFIGURATION_FETCH_REJECTED //configurationFetchRejecte
  },

  process({ httpClient, getState, action }, dispatch, done) {
    return httpClient.get(`http://${MICROCONTROLLER_ADRESS}/${CONFIGURATION_ENDPOINT}`)
      .then((resp: any) => {
        // const lastUpdate = new Date(moment(resp.data.lastUpdate, 'DD/MM/YYYY HH:mm:ss').valueOf());
        const data = resp.data;

        return { configuration: data, lastUpdate: new Date() };
      })
        .then((payload: any) =>{
            dispatch(configurationFetchFulfilled(payload.configuration, payload.lastUpdate));
            }
        )
        .then(() => done());
  }
});

export default [
  configurationFetchLogic
];
