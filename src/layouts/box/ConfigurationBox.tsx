import React from 'react';
import { withStyles } from '@material-ui/core';
import {
    FormattedMessage, FormattedDate, FormattedTime //, FormattedNumber, FormattedDate, FormattedTime, injectIntl
} from 'react-intl';
import OfflineBolt from '@material-ui/icons/OfflineBolt';
import DateRange from '@material-ui/icons/DateRange';

import FavoriteIconSelected from '@material-ui/icons/Favorite';
import FavoriteIcon from '@material-ui/icons/FavoriteBorder';
import boxStyle from './style/boxStyle';
import Card from './../../component/card/Card';
import CardHeader from './../../component/card/CardHeader';
import CardIcon from './../../component/card/CardIcon';
import CardFooter from './../../component/card/CardFooter';
import Button from './../../component/customButtons/Button';
import {IBox} from "./Types";
import {IConfiguration} from "../../redux/types/configuration";
import {ThemeColors} from "../GenericTypes";

interface OwnProps {
    configurationFetch: () => void,
    classes: any;
    configuration?: IConfiguration | null,
    lastUpdate: Date | null
}

type Props = IBox & OwnProps;

class ConfigurationBox extends React.Component<Props> {
    static defaultProps = {
        color: 'warning' as ThemeColors,
        configuration: null,
        lastUpdate: null,

        configurationFetch: () => console.log("Retrieve configuration")
    };

    constructor(props: Props) {
        super(props);
        props.configurationFetch();
    }

    handleHome = () => {
        const {
            isInHome, removeElementFromHome, addElementToHome, boxType
        } = this.props;
        if (isInHome) {
            removeElementFromHome(boxType);
        } else {
            addElementToHome(boxType);
        }
    };

    render() {
        const { classes, id, color } = this.props;
        const {
            configuration, lastUpdate, isInHome
        } = this.props;

        return (
            <Card>
                <CardHeader color={color} className="dragHeader" stats icon>
        <CardIcon color={color}>
            <OfflineBolt />
            </CardIcon>
            <p className={classes.cardCategory}>
        <FormattedMessage
            id={`configuration.preferences.title`}
        />
        </p>
        <h3 className={classes.cardTitle}>

        Kw
        </h3>
        </CardHeader>
        <CardFooter stats>
        <div className={classes.stats}>
        <DateRange />
        <FormattedMessage
            id="last.update"
        defaultMessage="Last update"
            />
            {' '}
        {(lastUpdate) ? [<FormattedDate key={0} value={lastUpdate} />, ' ', <FormattedTime key={1} value={lastUpdate} />] : '-'}
        </div>
        <Button color="transparent" className={classes.buttonFooter} onClick={this.handleHome}>
        {isInHome ? <FavoriteIconSelected /> : <FavoriteIcon />}
        </Button>
        </CardFooter>
        </Card>
    );
    }
}

// ConfigurationBox.propTypes = {
//     classes: PropTypes.object.isRequired,
//     value: PropTypes.number,
//     lastUpdate: PropTypes.instanceOf(Date),
//     dataType: PropTypes.oneOf([
//         'lifetime',
//         'yearly',
//         'montly',
//         'weekly',
//         'daily'
//     ]),
//     id: PropTypes.string.isRequired,
//     color: PropTypes.oneOf([
//         'warning',
//         'success',
//         'danger',
//         'info',
//         'primary',
//         'rose'
//     ]),
//     productionTotalsFetch: PropTypes.func.isRequired,
//     addElementToHome: PropTypes.func.isRequired,
//     removeElementFromHome: PropTypes.func.isRequired,
//     boxType: PropTypes.string.isRequired,
//     isInHome: PropTypes.bool.isRequired
// };
// ConfigurationBox.defaultProps = {
//     dataType: 'lifetime',
//     color: 'warning',
//     value: null,
//     lastUpdate: null
// };


export default withStyles(boxStyle)(ConfigurationBox);
