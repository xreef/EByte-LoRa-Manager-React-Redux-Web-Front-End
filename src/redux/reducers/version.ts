import {
  IVersion, SET_VERSION, key, VersionActions,
} from '../types/version';
import { RootState } from './index';

export const versionSelectors = {
  appVersion: (state: RootState): string => state[key].version,
  appDate: (state: RootState): string => state[key].date,
};

const initialState: IVersion = {
  version: '0.0.1',
  date: '1/1/2000',
};

export default function versionReducer(state: IVersion = initialState, action: VersionActions): IVersion {
  switch (action.type) {
    case SET_VERSION:
      return { version: action.payload.version, date: action.payload.date };
    default:
      return state;
  }
}
