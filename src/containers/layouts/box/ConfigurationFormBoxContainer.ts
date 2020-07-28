import {connect} from "react-redux";
import {RootState} from "../../../redux/reducers";
import {configurationSelectors} from "../../../redux/reducers/configuration";
import {configurationFetch, addElementToHome} from "../../../redux/actions";
import ConfigurationFormBox from "../../../layouts/box/ConfigurationFormBox";

const mapStateToProps = (state: RootState/*, ownProps*/) => ({
    configuration: configurationSelectors.configuration(state),
});

const mapDispatchToProps = {
    configurationFetch,
    addElementToHome
};

export default connect(mapStateToProps, mapDispatchToProps)(ConfigurationFormBox);
