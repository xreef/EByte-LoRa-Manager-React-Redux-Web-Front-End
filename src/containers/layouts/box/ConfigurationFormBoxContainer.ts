import {connect} from "react-redux";
import {RootState} from "../../../redux/reducers";
import {configurationSelectors} from "../../../redux/reducers/configuration";
import {
    configurationFetch,
    configurationFieldUpdated,
    configurationAdd,
    addElementToHome,
    moduleInfoFetch, removeElementFromHome, resetDeviceFetch
} from "../../../redux/actions";
import ConfigurationFormBox from "../../../layouts/box/ConfigurationFormBox";
import {homeSelectors} from "../../../redux/reducers/home";
import {ILayoutConfigured, ILayoutElement} from "../../../redux/types/home";
import {moduleInfoSelectors} from "../../../redux/reducers/moduleInfo";

const isElementInHome = (element: string, homeElements: ILayoutElement[]) => homeElements.some((elem: ILayoutElement) => elem.additionalInfo.boxType === element);

const mapStateToProps = (state: RootState, ownProps: {boxType: string}) => ({
    configuration: configurationSelectors.configuration(state),
    moduleInfo: moduleInfoSelectors.moduleInfo(state),
    isInHome: isElementInHome(ownProps.boxType, homeSelectors.elements(state)),
    isFetching: state.configuration.isFetching || state.resetDevice.isFetching,
});


const mapDispatchToProps = {
    configurationFetch,
    configurationFieldUpdated,
    configurationAdd,
    addElementToHome,
    removeElementFromHome,
    resetDeviceFetch
};

export default connect(mapStateToProps, mapDispatchToProps)(ConfigurationFormBox);
