import {
  // IVersion,
  SET_VERSION,
} from '../types/version';

export const setVersion = (version: string, date: string) => ({
  type: SET_VERSION,
  payload: { version, date },
});
