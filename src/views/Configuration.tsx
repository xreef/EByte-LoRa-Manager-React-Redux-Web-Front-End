import React from 'react';
import guid from './../utils/math/guid';

import ResponsiveGrid from '../component/responsiveGrid/ResponsiveGrid';

import {ILayoutConfigured, ILayoutElement} from "../redux/types/home";
import boxes from "../layouts/box/boxes";
import {RootState} from "../redux/reducers";
import {setConfigurationPageLayout} from "../redux/actions";
import {configurationPageSelectors} from "../redux/reducers/configurationPage";
import {connect} from "react-redux";

interface OwnProps {

}

const mapStateToProps = (state: RootState/*, ownProps*/) => ({
    layouts: configurationPageSelectors.layouts(state),
});

const mapDispatchToProps = {
    saveLayouts: setConfigurationPageLayout
};

type StateProps = ReturnType<typeof mapStateToProps>
type DispatchProps = typeof mapDispatchToProps

type Props = StateProps & DispatchProps & OwnProps;


// interface Props {
//     layouts: ILayoutConfigured,
//     saveLayouts: () => void
// }

interface ComponentState {
  elements: ILayoutElement[]
}

class Configuration extends React.Component<Props, ComponentState> {
  static defaultProps = {
      layouts: {
          lg: [], md: [], sm: [], xs: [], xxs: [],
      },
      saveLayouts: (layouts: any): any => console.log('Save layout', layouts)
  };

  constructor(props: Props) {
    super(props);
    this.state = {
      elements: [
        // {i: guid(), ...{...boxes['configurationBoxContainer']}},
        {i: "moduleInfoBoxContainer", ...{...boxes['moduleInfoBoxContainer']}},
        {i: "configurationFormBoxContainer", ...{...boxes['configurationFormBoxContainer']}},
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
    const { layouts,saveLayouts } = this.props;


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
export default connect(mapStateToProps, mapDispatchToProps)(Configuration);

// export default Configuration;
