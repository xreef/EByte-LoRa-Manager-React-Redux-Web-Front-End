## Front end for EByte LoRa E32 devices

After npm i 
You must overwrite
node_modules\redux-logic\definitions\logic.d.ts
with
src\redux\types\logic.d.ts

than to start
npm run dev

to do the build (in linux env, you can use also windows linux env)
npm run buildwp

# EByte LoRa E32  Web Manager and gateway
A simple web interface for the esp8266 to configure, sending and receiving LoRa messages.
[![Here an example of sending message and receiving](https://img.youtube.com/vi/Jy247Nb33T4/hqdefault.jpg)](https://www.youtube.com/watch?v=Jy247Nb33T4)

## Documentation
- [EByte LoRa E32 gateway: manage via REST and WebSocket (esp8266, esp32)](https://www.mischianti.org/2021/07/20/ebyte-lora-e32-gateway-manage-via-rest-and-websocket-esp8266-esp32-1/)
- [EByte LoRa E32 Web Manager: description, configure and demo (esp8266, esp32)](https://www.mischianti.org/2021/07/24/ebyte-lora-e32-web-manager-description-configure-and-demo-esp8266-esp32-2/)

## API of the gateway
https://documenter.getpostman.com/view/1698430/TVCcXpbi
