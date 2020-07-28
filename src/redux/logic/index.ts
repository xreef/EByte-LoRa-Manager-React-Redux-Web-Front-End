import configurationGET from './configurationGET';
import configurationPOST from './configurationPOST';

import webSocket from './webSocket';

export default [
    ...configurationGET,
    ...configurationPOST,
    ...webSocket
];
