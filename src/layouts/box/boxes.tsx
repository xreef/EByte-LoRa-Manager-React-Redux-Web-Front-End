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
        isResizable: false,
        minW: 2,
        maxW: 2,
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
        isResizable: false,
        minW: 2,
        maxW: 2,
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
        isResizable: false,
      minW: 2,
      maxW: 4,
      minH: 4,
      maxH: 4,
      w: 3,
      h: 4,
    },

    // tableBoxInverterAlarmsContainer: {
  //   additionalInfo: {
  //     classObj: (id, props) => (<TableBoxInverterAlarmsContainer key={id} id={id} {...props} />),
  //     defaultProps: {
  //       color: 'danger',
  //     },
  //     boxType: 'tableBoxInverterAlarmsContainer',
  //   },
  //   resize: true,
  //   close: true,
  //   minW: 1,
  //   maxW: 4,
  //   minH: 1,
  //   maxH: 2,
  //   w: 1,
  //   h: 2,
  // },
  // tableBoxInverterInformationContainer: {
  //   additionalInfo: {
  //     classObj: (id, props) => (<TableBoxInverterInformationContainer key={id} id={id} {...props} />),
  //     defaultProps: {
  //       color: 'success',
  //     },
  //     boxType: 'tableBoxInverterInformationContainer',
  //   },
  //   resize: true,
  //   close: true,
  //   minW: 1,
  //   maxW: 4,
  //   minH: 1,
  //   maxH: 4,
  //   w: 1,
  //   h: 4,
  // },
  // chartBoxMonthly: {
  //   additionalInfo: {
  //     classObj: (id, props) => (<ChartBoxMonthlyContainer key={id} id={id} {...props} />),
  //     defaultProps: {
  //       month: moment().format('YYYYMM'),
  //       color: 'rose',
  //     },
  //     boxType: 'chartBoxMonthly',
  //     color: 'info',
  //   },
  //   resize: true,
  //   close: true,
  //   minW: 1,
  //   maxW: 4,
  //   minH: 2,
  //   maxH: 4,
  //   w: 2,
  //   h: 2,
  // },
  // chartBoxProductionPower: {
  //   additionalInfo: {
  //     classObj: (id, props) => (<ChartBoxProductionPowerContainer key={id} id={id} {...props} />),
  //     defaultProps: {
  //       day: moment().format('YYYYMMDD'),
  //       dataType: 'power',
  //       color: 'info',
  //     },
  //     boxType: 'chartBoxProductionPower',
  //     color: 'info',
  //   },
  //   resize: true,
  //   close: true,
  //   minW: 1,
  //   maxW: 4,
  //   minH: 2,
  //   maxH: 4,
  //   w: 2,
  //   h: 2,
  // },
  // chartBoxProductionCurrent: {
  //   additionalInfo: {
  //     classObj: (id, props) => (<ChartBoxProductionCurrentContainer key={id} id={id} {...props} />),
  //     defaultProps: {
  //       day: moment().format('YYYYMMDD'),
  //       dataType: 'current',
  //       color: 'success',
  //     },
  //     boxType: 'chartBoxProductionCurrent',
  //
  //   },
  //   resize: true,
  //   close: true,
  //   minW: 1,
  //   maxW: 4,
  //   minH: 2,
  //   maxH: 4,
  //   w: 2,
  //   h: 2,
  // },
  // chartBoxBattery: {
  //   additionalInfo: {
  //     classObj: (id, props) => (<ChartBoxBatteryContainer key={id} id={id} {...props} />),
  //     defaultProps: {
  //       day: moment().format('YYYYMMDD'),
  //       dataType: 'battery',
  //       color: 'success',
  //     },
  //     boxType: 'chartBoxBattery',
  //
  //   },
  //   resize: true,
  //   close: true,
  //   minW: 1,
  //   maxW: 4,
  //   minH: 2,
  //   maxH: 4,
  //   w: 2,
  //   h: 2,
  // },
  // chartBoxProductionVoltage: {
  //   additionalInfo: {
  //     classObj: (id, props) => (<ChartBoxProductionVoltageContainer key={id} id={id} {...props} />),
  //     defaultProps: {
  //       day: moment().format('YYYYMMDD'),
  //       dataType: 'voltage',
  //       color: 'warning',
  //     },
  //     boxType: 'chartBoxProductionVoltage',
  //
  //   },
  //   resize: true,
  //   close: true,
  //   minW: 1,
  //   maxW: 4,
  //   minH: 2,
  //   maxH: 4,
  //   w: 2,
  //   h: 2,
  // },
  // informativeBoxLifetimeProductionContainer: {
  //   additionalInfo: {
  //     classObj: (id, props) => (<InformativeBoxLifetimeProductionContainer key={id} id={id} {...props} />),
  //     defaultProps: {
  //       dataType: 'lifetime',
  //       color: 'warning',
  //       value: 0,
  //       lastUpdate: null,
  //     },
  //     boxType: 'informativeBoxLifetimeProductionContainer',
  //   },
  //   resize: true,
  //   close: true,
  //   minW: 1,
  //   maxW: 1,
  //   minH: 1,
  //   maxH: 1,
  //   w: 1,
  //   h: 1,
  // },
  // informativeBoxYearlyProductionContainer: {
  //   additionalInfo: {
  //     classObj: (id, props) => (<InformativeBoxYearlyProductionContainer key={id} id={id} {...props} />),
  //     defaultProps: {
  //       dataType: 'lifetime',
  //       color: 'info',
  //       value: 0,
  //       lastUpdate: null,
  //     },
  //     boxType: 'informativeBoxYearlyProductionContainer',
  //   },
  //   resize: true,
  //   close: true,
  //   minW: 1,
  //   maxW: 1,
  //   minH: 1,
  //   maxH: 1,
  //   w: 1,
  //   h: 1,
  // },
  // informativeBoxMontlyProductionContainer: {
  //   additionalInfo: {
  //     classObj: (id, props) => (<InformativeBoxMontlyProductionContainer key={id} id={id} {...props} />),
  //     defaultProps: {
  //       dataType: 'lifetime',
  //       color: 'rose',
  //       value: 0,
  //       lastUpdate: null,
  //     },
  //     boxType: 'informativeBoxMontlyProductionContainer',
  //   },
  //   resize: true,
  //   close: true,
  //   minW: 1,
  //   maxW: 1,
  //   minH: 1,
  //   maxH: 1,
  //   w: 1,
  //   h: 1,
  // },
  // informativeBoxWeeklyProductionContainer: {
  //   additionalInfo: {
  //     classObj: (id, props) => (<InformativeBoxWeeklyProductionContainer key={id} id={id} {...props} />),
  //     defaultProps: {
  //       dataType: 'weekly',
  //       color: 'success',
  //       value: 0,
  //       lastUpdate: null,
  //     },
  //     boxType: 'informativeBoxWeeklyProductionContainer',
  //   },
  //   resize: true,
  //   close: true,
  //   minW: 1,
  //   maxW: 1,
  //   minH: 1,
  //   maxH: 1,
  //   w: 1,
  //   h: 1,
  // },
  // informativeBoxDailyProductionContainer: {
  //   additionalInfo: {
  //     classObj: (id, props) => (<InformativeBoxDailyProductionContainer key={id} id={id} {...props} />),
  //     defaultProps: {
  //       dataType: 'weekly',
  //       color: 'danger',
  //       value: 0,
  //       lastUpdate: null,
  //     },
  //     boxType: 'informativeBoxDailyProductionContainer',
  //   },
  //   resize: true,
  //   close: true,
  //   minW: 1,
  //   maxW: 1,
  //   minH: 1,
  //   maxH: 1,
  //   w: 1,
  //   h: 1,
  // },
  // informativeBoxRealtimeProductionContainer: {
  //   additionalInfo: {
  //     classObj: (id, props) => (<InformativeBoxRealtimeProductionContainer key={id} id={id} {...props} />),
  //     defaultProps: {
  //       dataType: 'power',
  //       color: 'success',
  //       value: 0,
  //       lastUpdate: null,
  //     },
  //     boxType: 'informativeBoxRealtimeProductionContainer',
  //   },
  //   resize: true,
  //   close: true,
  //   minW: 1,
  //   maxW: 1,
  //   minH: 1,
  //   maxH: 1,
  //   w: 1,
  //   h: 1,
  // },
};

export default boxes;
