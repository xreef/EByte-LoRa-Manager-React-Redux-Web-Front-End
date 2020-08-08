import { VersionActions } from './version';
import { ConfigurationActions } from './configuration';
import { ServerStateActions } from "./serverState";
import { WebSocketActions } from "./webSocket";
import { NotificationsActions } from "./notifications";
import {HomeActions} from "./home";
import {DeviceMessagesActions} from "./deviceMessages";

export type AppActions = VersionActions | ConfigurationActions | ServerStateActions | WebSocketActions |
    NotificationsActions | HomeActions | DeviceMessagesActions
