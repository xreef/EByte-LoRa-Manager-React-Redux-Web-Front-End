import {connect} from "react-redux";
import {RootState} from "../../../redux/reducers";
import {configurationSelectors} from "../../../redux/reducers/configuration";
import {
    webSocketOpen,
    webSocketClose,
    addElementToHome,
    removeElementFromHome,
    webSocketSendMessage
} from "../../../redux/actions";
import {homeSelectors} from "../../../redux/reducers/home";
import {ILayoutConfigured, ILayoutElement} from "../../../redux/types/home";
import {moduleInfoSelectors} from "../../../redux/reducers/moduleInfo";
import ReceiveMessagesBox from "../../../layouts/box/ReceiveMessagesBox";
import {webSocketSelectors} from "../../../redux/reducers/webSocket";
import {deviceMessagesSelectors} from "../../../redux/reducers/deviceMessages";

const isElementInHome = (element: string, homeElements: ILayoutElement[]) => homeElements.some((elem: ILayoutElement) => elem.additionalInfo.boxType === element);

const mapStateToProps = (state: RootState, ownProps: {boxType: string}) => ({
    isInHome: isElementInHome(ownProps.boxType, homeSelectors.elements(state)),
    isConnected: webSocketSelectors.isConnected(state),
    singleMessage: webSocketSelectors.singleMessage(state),
    receivingDeviceMessages: webSocketSelectors.receivingDeviceMessages(state),
    lastMessage: deviceMessagesSelectors.messageReceived(state),
});


const mapDispatchToProps = {
    webSocketSendMessage,
    webSocketOpen,
    webSocketClose,
    addElementToHome,
    removeElementFromHome
};

export default connect(mapStateToProps, mapDispatchToProps)(ReceiveMessagesBox);
