import React from 'react';
import {ILayoutElement} from "../../redux/types/home";

import ConfigurationFormBoxContainer from "./../../containers/layouts/box/ConfigurationFormBoxContainer"
import ModuleInfoBoxContainer from "./../../containers/layouts/box/ModuleInfoBoxContainer"
import SendTabBoxContainer from "./../../containers/layouts/box/SendTabBoxContainer"
import ReceiveMessagesBoxContainer from "./../../containers/layouts/box/ReceiveMessagesBoxContainer"

interface IBoxes {
    [propName: string]: ILayoutElement;
}

const boxes: IBoxes = {
    receiveMessagesBoxContainer: {
        additionalInfo: {
            classObj: (id: string, props: any) => (<ReceiveMessagesBoxContainer key={id} id={id} {...props} />),
            defaultProps: {
                color: 'primary',
            },
            boxType: 'receiveMessagesBoxContainer',
        },
        isBounded: undefined,
        isDraggable: undefined,
        isResizable: true,
        minW: 2,
        maxW: 5,
        minH: 2,
        maxH: 2,
        w: 2,
        h: 2,
    },
    sendTabBoxContainer: {
        additionalInfo: {
            classObj: (id: string, props: any) => (<SendTabBoxContainer key={id} id={id} {...props} />),
            defaultProps: {
                color: 'danger',
            },
            boxType: 'sendTabBoxContainer',
        },
        isBounded: undefined,
        isDraggable: undefined,
        isResizable: true,
        minW: 2,
        maxW: 5,
        minH: 2,
        maxH: 2,
        w: 2,
        h: 2,
    },
    moduleInfoBoxContainer: {
        additionalInfo: {
            classObj: (id: string, props: any) => (<ModuleInfoBoxContainer key={id} id={id} {...props} />),
            defaultProps: {
                color: 'danger',
            },
            boxType: 'moduleInfoBoxContainer',
        },
        isBounded: false,
        isDraggable: true,
        isResizable: false,
        minW: 1,
        maxW: 1,
        minH: 2,
        maxH: 2,
        w: 1,
        h: 2,
    },
    configurationFormBoxContainer: {
      additionalInfo: {
        classObj: (id: string, props: any) => (<ConfigurationFormBoxContainer key={id} id={id} {...props} />),
        defaultProps: {
          color: 'warning',
        },
        boxType: 'configurationFormBoxContainer',
      },
        isBounded: undefined,
        isDraggable: undefined,
        isResizable: true,
      minW: 1,
      maxW: 5,
      minH: 4,
      maxH: 8,
      w: 3,
      h: 4,
    },

};

export default boxes;
