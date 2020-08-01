import React from 'react';
import { connect } from 'react-redux';
// import PropTypes from 'prop-types';
import ResponsiveGrid from '../component/responsiveGrid/ResponsiveGrid';

import {
  setHomeLayout
} from "../redux/actions";
import { homeSelectors } from '../redux/reducers/home';
import boxes from '../layouts/box/boxes';
// import {ILayoutConfigured, ILayoutElement} from "../redux/types/home";
// import {AppActions} from "../redux/types";
import {RootState} from "../redux/reducers";
import {ILayoutElement} from "../redux/types/home";
// import {versionSelectors} from "../redux/reducers/version";
// import {configurationFetch, setVersion} from "../redux/actions";

// interface HomeProps {
//     layouts: ILayoutConfigured,
//     elements: ILayoutElement[],
//
//     saveLayouts: AppActions | Function
// }
//
interface OwnProps {

}
//
// type Props = StateProps & DispatchProps & OwnProps

const mapStateToProps = (state: RootState/*, ownProps*/) => ({
    layouts: homeSelectors.layouts(state),
    elements: homeSelectors.elements(state).map((elementHS: ILayoutElement) => {
        const eHS = { ...elementHS };
        eHS.additionalInfo.classObj = boxes[eHS.additionalInfo.boxType].additionalInfo.classObj;
        eHS.additionalInfo.defaultProps = boxes[eHS.additionalInfo.boxType].additionalInfo.defaultProps;
        return eHS;
    })
});

const mapDispatchToProps = {
    saveLayouts: setHomeLayout
};

type StateProps = ReturnType<typeof mapStateToProps>
type DispatchProps = typeof mapDispatchToProps

type HomeProps = StateProps & DispatchProps & OwnProps


class Home extends React.Component<HomeProps, {}> {
  // constructor(props) {
  //   super(props);
  // }
  public static defaultProps: HomeProps = {
      layouts: {
          lg: [], md: [], sm: [], xs: [], xxs: [],
      },
      elements: [],
      saveLayouts: (layouts: any): any => console.log('Save layout', layouts)
  };

  public render(): JSX.Element  {
    const { layouts, elements, saveLayouts } = this.props;
    return <ResponsiveGrid layouts={layouts} elements={elements} showSaveLayoutsButton saveLayouts={saveLayouts} />;
  }
}

// Home.propTypes = {
//   layouts: PropTypes.object,
//   elements: PropTypes.array,
//
//   saveLayouts: PropTypes.func
// };

// Home.defaultProps = {
//   layouts: {
//     lg: [], md: [], sm: [], xs: [], xxs: [],
//   },
//   elements: [],
//   saveLayouts: () => console.log('Save layout')
// };


export default connect(mapStateToProps, mapDispatchToProps)(Home);
