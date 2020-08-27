import configurationGET from './configurationGET';
import moduleInfoGET from './moduleInfoGET';

import configurationPOST from './configurationPOST';

import webSocket from './webSocket';
import messageTransparentPOST from "./messageTransparentPOST";
import messageBroadcastPOST from "./messageBroadcastPOST";
import messageFixedPOST from "./messageFixedPOST";
import resetDeviceGET from "./resetDeviceGET";

export default [
    ...configurationGET,
    ...moduleInfoGET,
    ...configurationPOST,
    ...messageTransparentPOST,
    ...messageBroadcastPOST,
    ...messageFixedPOST,
    ...webSocket,
    ...resetDeviceGET
];
