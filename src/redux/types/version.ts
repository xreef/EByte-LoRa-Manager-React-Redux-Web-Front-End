import {Action} from "redux";

export interface IVersion {
    version: string;
    date: string;
}

export const key = 'version';

// action type constants
export const SET_VERSION = 'SET_VERSION';

export const actionTypes = {
  SET_VERSION,
};

class SetVersion implements Action{
    readonly type = SET_VERSION

    constructor(public payload: IVersion) {}
}
export type VersionActions = SetVersion
