import MenuItem from "@material-ui/core/MenuItem/MenuItem";
import React from "react";

export const getFrequences = (operatingFrequency: number): JSX.Element[] => {
    let freq: JSX.Element[] = [];
    for (var key=0; key<31; key++){
        freq.push(<MenuItem key={key} value={key+""}>{(key+operatingFrequency)+"MHz"}</MenuItem>);
    }
    // return (Array.from({length: 31}) .forEach((key) => {
    //     freq.push(<MenuItem value={key}>{(key+operatingFrequency)+"MHz"}</MenuItem>);
    // }))
    return freq;
}
export const getADD = (): JSX.Element[] => {
    let freq: JSX.Element[] = [];
    for (var key=0; key<255; key++){
        freq.push(<MenuItem key={key} value={key}>{key}</MenuItem>);
    }
    // return (Array.from({length: 31}) .forEach((key) => {
    //     freq.push(<MenuItem value={key}>{(key+operatingFrequency)+"MHz"}</MenuItem>);
    // }))
    return freq;
}
