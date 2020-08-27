import { VersionActions } from './version';
import { ConfigurationActions } from './configuration';
import { ServerStateActions } from "./serverState";
import { WebSocketActions } from "./webSocket";
import { NotificationsActions } from "./notifications";
import {HomeActions} from "./home";
import {DeviceMessagesActions} from "./deviceMessages";
import {ConfigurationPageActions} from "./configurationPage";
import {SendReceiveDataPageActions} from "./sendReceiveDataPage";
import {ResetDeviceActions} from "./resetDevice";

export type AppActions = VersionActions | ConfigurationActions | ServerStateActions | WebSocketActions |
    NotificationsActions | HomeActions | DeviceMessagesActions | ConfigurationPageActions | SendReceiveDataPageActions |
    ResetDeviceActions;
