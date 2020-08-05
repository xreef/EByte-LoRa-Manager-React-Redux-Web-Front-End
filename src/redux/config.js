export const MICROCONTROLLER_ADRESS = `${(window.settings.localIP) ? window.settings.localIP : window.location.hostname}:${window.settings.localRestPort}`;
export const MICROCONTROLLER_WS_ADRESS = `ws://${(window.settings.localIP) ? window.settings.localIP : window.location.hostname}:${window.settings.localWSPort}`;

export const CONFIGURATION_ENDPOINT = "configuration";
export const MODULE_INFO_ENDPOINT = "moduleInfo";
export const SERVER_STATE_ENDPOINT = "serverState";
