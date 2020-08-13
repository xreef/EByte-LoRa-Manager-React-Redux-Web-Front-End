import {connect} from "react-redux";
import {RootState} from "../../../redux/reducers";
import {moduleInfoSelectors} from "../../../redux/reducers/moduleInfo";
import {moduleInfoFetch, addElementToHome, removeElementFromHome} from "../../../redux/actions";
import {homeSelectors} from "../../../redux/reducers/home";
import {ILayoutConfigured, ILayoutElement} from "../../../redux/types/home";
import ModuleInfoBox from "../../../layouts/box/ModuleInfoBox";

const isElementInHome = (element: string, homeElements: ILayoutElement[]) => homeElements.some((elem: ILayoutElement) => elem.additionalInfo.boxType === element);

const mapStateToProps = (state: RootState, ownProps: {boxType: string}) => ({
    moduleInfo: moduleInfoSelectors.moduleInfo(state),
    isInHome: isElementInHome(ownProps.boxType, homeSelectors.elements(state)),
    isFetching: state.moduleInfo.isFetching,
});


const mapDispatchToProps = {
    moduleInfoFetch,
    addElementToHome,
    removeElementFromHome
};

export default connect(mapStateToProps, mapDispatchToProps)(ModuleInfoBox);
