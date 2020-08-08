import {connect} from "react-redux";
import {RootState} from "../../../redux/reducers";
import {moduleInfoSelectors} from "../../../redux/reducers/moduleInfo";
import {    moduleInfoFetch,
            addElementToHome,
            configurationFetch,
            deviceMessagesSendTransparent,
            deviceMessagesSendBroadcast,
            deviceMessagesSendFixed,
            deviceMessagesFieldInvalid
    } from "../../../redux/actions";
import {homeSelectors} from "../../../redux/reducers/home";
import {ILayoutConfigured, ILayoutElement} from "../../../redux/types/home";
import ModuleInfoBox from "../../../layouts/box/ModuleInfoBox";
import {configurationSelectors} from "../../../redux/reducers/configuration";
import SendTabBox from "../../../layouts/box/SendTabBox";
import {FIDEX_TRANSMISSION} from "../../../redux/types/configuration";

const isElementInHome = (element: string, homeElements: ILayoutElement[]) => homeElements.some((elem: ILayoutElement) => elem.additionalInfo.boxType === element);

const mapStateToProps = (state: RootState, ownProps: {boxType: string}) => ({
    configuration: configurationSelectors.configuration(state),
    moduleInfo: moduleInfoSelectors.moduleInfo(state),
    isInHome: isElementInHome(ownProps.boxType, homeSelectors.elements(state)),
    isFetching: state.moduleInfo.isFetching || state.configuration.isFetching,
    tabToShow:  (
        configurationSelectors.configuration(state).OPTION.fixedTransmission===
        FIDEX_TRANSMISSION.FT_TRANSPARENT_TRANSMISSION)?["transparent"]:["fixed", "broadcast"],
});


const mapDispatchToProps = {
    configurationFetch,
    moduleInfoFetch,

    deviceMessagesSendTransparent,
    deviceMessagesSendBroadcast,
    deviceMessagesSendFixed,

    deviceMessagesFieldInvalid,

    addElementToHome
};

export default connect(mapStateToProps, mapDispatchToProps)(SendTabBox);
