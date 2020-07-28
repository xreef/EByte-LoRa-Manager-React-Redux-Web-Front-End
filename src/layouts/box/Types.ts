import {ThemeColors} from "../GenericTypes";

export interface IBox {
    addElementToHome: (elementType: string) => void,
    removeElementFromHome: (elementType: string) => void,
    boxType: string,
    isInHome: boolean,
    id: string,
    color: ThemeColors
}
