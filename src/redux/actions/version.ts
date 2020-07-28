import {
    // IVersion,
    SET_VERSION, VersionActions,
} from '../types/version';

export const setVersion = (version: string, date: string): VersionActions => ({
  type: SET_VERSION,
  payload: { version, date },
});
