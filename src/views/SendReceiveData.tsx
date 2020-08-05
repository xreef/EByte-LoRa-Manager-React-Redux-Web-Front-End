import React from 'react';
import guid from './../utils/math/guid';

import ResponsiveGrid from '../component/responsiveGrid/ResponsiveGrid';

import {ILayoutConfigured, ILayoutElement} from "../redux/types/home";
import boxes from "../layouts/box/boxes";

interface Props {
    layouts: ILayoutConfigured,
}

interface ComponentState {
  elements: ILayoutElement[]
}

class SendReceiveData extends React.Component<Props, ComponentState> {
  static defaultProps = {
      layouts: {
          lg: [], md: [], sm: [], xs: [], xxs: [],
      },
  };

  constructor(props: Props) {
    super(props);
    this.state = {
      elements: [
        // {i: guid(), ...{...boxes['configurationBoxContainer']}},
        // {i: "moduleInfoBoxContainer", ...{...boxes['moduleInfoBoxContainer']}},
        // {i: "configurationFormBoxContainer", ...{...boxes['configurationFormBoxContainer']}},
        // {i: guid(), ...{...boxes['tableBoxInverterInformationContainer']}},
        // { i: 'chartBoxMonthlyId', ...{ ...boxes.chartBoxMonthly } },
        // { i: 'informativeBoxLifetimeProductionContainerId', ...{ ...boxes.informativeBoxLifetimeProductionContainer } },
        // { i: 'informativeBoxYearlyProductionContainerId', ...{ ...boxes.informativeBoxYearlyProductionContainer } },
        // { i: 'informativeBoxMontlyProductionContainerId', ...{ ...boxes.informativeBoxMontlyProductionContainer } },
        // { i: 'informativeBoxWeeklyProductionContainerId', ...{ ...boxes.informativeBoxWeeklyProductionContainer } },
        // {i: guid(), ...{...boxes['chartBoxProductionPower']}}
        // ,{i: guid(), ...{...boxes['chartBoxProductionCurrent']}}
        // ,{i: guid(), ...{...boxes['chartBoxProductionVoltage']},
        // ...{additionalInfo: {...boxes['chartBoxProductionVoltage'].additionalInfo,
        //             settingsProps: {
        //                 day: "20181019"
        //             }
        //         }}}
      ],
    };

  }

  componentDidMount(){

  }

  render() {
    const { layouts } = this.props;


    return (
      <ResponsiveGrid
        elements={[...this.state.elements]}
        layouts={layouts}
        showSaveLayoutsButton
        // saveLayouts={saveLayouts}
      />
    );
  }
}

// Historical.propTypes = {
//   layouts: PropTypes.object,
//
//   saveLayouts: PropTypes.func
// };

// SendReceiveData.defaultProps = {
//   layouts: {
//     lg: [], md: [], sm: [], xs: [], xxs: [],
//   },
//   saveLayouts: () => console.log('Save layout')
// };

// const mapStateToProps = (state: RootState/*, ownProps*/) => ({
//   // layouts: historicalSelector.layouts(state),
// });
//
// const mapDispatchToProps = {
//   // saveLayouts: setHistoricalLayout
//   //   configurationFetch
// };
//
// export default connect(mapStateToProps, mapDispatchToProps)(SendReceiveData);

export default SendReceiveData;
