import React from 'react';
import guid from './../utils/math/guid';

import ResponsiveGrid from '../component/responsiveGrid/ResponsiveGrid';

import {ILayoutConfigured, ILayoutElement} from "../redux/types/home";
import boxes from "../layouts/box/boxes";
import {RootState} from "../redux/reducers";
import {configurationPageSelectors} from "../redux/reducers/configurationPage";
import {setConfigurationPageLayout, setSendReceiveDataPageLayout} from "../redux/actions";
import {sendReceiveDataPageSelectors} from "../redux/reducers/sendReceiveDataPage";
import {connect} from "react-redux";

interface OwnProps {

}

const mapStateToProps = (state: RootState/*, ownProps*/) => ({
    layouts: sendReceiveDataPageSelectors.layouts(state),
});

const mapDispatchToProps = {
    saveLayouts: setSendReceiveDataPageLayout
};

type StateProps = ReturnType<typeof mapStateToProps>
type DispatchProps = typeof mapDispatchToProps

type Props = StateProps & DispatchProps & OwnProps;

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
        {i: "sendTabBoxContainer", ...{...boxes['sendTabBoxContainer']}},
        {i: "receiveMessagesBoxContainer", ...{...boxes['receiveMessagesBoxContainer']}},
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
    const { layouts, saveLayouts } = this.props;


    return (
      <ResponsiveGrid
        elements={[...this.state.elements]}
        layouts={layouts}
        showSaveLayoutsButton
        saveLayouts={saveLayouts}
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
export default connect(mapStateToProps, mapDispatchToProps)(SendReceiveData);

// export default SendReceiveData;
