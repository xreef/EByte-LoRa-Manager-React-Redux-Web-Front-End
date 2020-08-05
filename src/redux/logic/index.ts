import configurationGET from './configurationGET';
import moduleInfoGET from './moduleInfoGET';

import configurationPOST from './configurationPOST';

import webSocket from './webSocket';

export default [
    ...configurationGET,
    ...moduleInfoGET,
    ...configurationPOST,
    ...webSocket
];
