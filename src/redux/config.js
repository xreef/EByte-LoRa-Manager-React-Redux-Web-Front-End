export const MICROCONTROLLER_ADRESS = `${(settings.localIP) ? settings.localIP : location.hostname}:${settings.localRestPort}`;
export const MICROCONTROLLER_WS_ADRESS = `ws://${(settings.localIP) ? settings.localIP : location.hostname}:${settings.localWSPort}`;
