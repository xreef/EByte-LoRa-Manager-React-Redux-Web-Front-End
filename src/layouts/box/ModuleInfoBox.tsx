import React from 'react';
import {GridSpacing, withStyles} from '@material-ui/core';
import {
    FormattedMessage, FormattedDate, FormattedTime //, FormattedNumber, FormattedDate, FormattedTime, injectIntl
} from 'react-intl';
import InfoRounded from '@material-ui/icons/InfoRounded';
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
import {ThemeColors} from "../GenericTypes";
import {frequencyFromModuleInfo, IModuleInfo, powerFromModuleInfo} from "../../redux/types/moduleInfo";
import CardBody from "../../component/card/CardBody";
import CircularProgress from "@material-ui/core/CircularProgress/CircularProgress";
import {colorMod} from "../../component/style/material-dashboard-react";
import GridItem from "../../component/grid/GridItem";
import GridContainer from "../../component/grid/GridContainer";

interface OwnProps {
    moduleInfoFetch: () => void,
    classes: any;
    moduleInfo?: IModuleInfo,
    lastUpdate?: Date,
    isFetching: boolean
}

type Props = IBox & OwnProps;

class ModuleInfoBox extends React.Component<Props> {
    static defaultProps = {
        color: 'warning' as ThemeColors,
        configuration: undefined,
        lastUpdate: undefined,
        isFetching: true,
        moduleInfoFetch: () => console.log("Retrieve configuration")
    };

    constructor(props: Props) {
        super(props);
        props.moduleInfoFetch();
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

    // User gives the module instruction (HEX format): C3 C3 C3,Module
    // returns its present version number, for example C3 32 xx yy. the second bytes means frequency. 32
    // here means the frequency is 433MHZ, 38 means frequency is 470MHz, 45 means frequency is;
    // 868MHz, 44 means the frequency is 915 MHz, 46 means the frequency is 170MHz; xx is the
    // version number and yy refers to the other module features.

    render() {
        const { classes, id, color, isFetching } = this.props;
        const {
            moduleInfo, lastUpdate, isInHome
        } = this.props;

        return (
            <Card>
                <CardHeader color={color} className="dragHeader" stats icon>
        <CardIcon color={color}>
            <InfoRounded />
            </CardIcon>
            <p className={classes.cardCategory}>
        <FormattedMessage
            id={`configuration.preferences.title`}
        />
        </p>
        <h3 className={classes.cardTitle}>

        Module info
        </h3>
        </CardHeader>
                <CardBody className={classes.cardBody}>
                    {(!isFetching)
                        ? (moduleInfo!==undefined)
                            ? (
                                <React.Fragment>
                                    <GridContainer  key={1} spacing={1 as GridSpacing}>
                                        <GridItem xs={12} sm={6} md={6}>
                                            <p className={classes.cardCategory}><FormattedMessage id="module_info.label.frequency" /></p>
                                            <h3 className={classes.cardTitle}>
                                                {(moduleInfo!==undefined && moduleInfo.frequency)?frequencyFromModuleInfo[moduleInfo.frequency].standard:' - '} <small>MHz</small>
                                            </h3>
                                        </GridItem>
                                        <GridItem xs={12} sm={6} md={6}>
                                            <p className={classes.cardCategory}><FormattedMessage id="module_info.label.power" /></p>
                                            <h3 className={classes.cardTitle}>
                                                {(moduleInfo!==undefined && moduleInfo.features)?powerFromModuleInfo[moduleInfo.features].maxPower:' - '} <small>dBm</small>
                                            </h3>
                                        </GridItem>
                                        <GridItem xs={12} sm={6} md={6}>
                                            <p className={classes.cardCategory}><FormattedMessage id="module_info.label.version" /></p>
                                            <h3 className={classes.cardTitle}>
                                                {moduleInfo!==undefined && moduleInfo.version}
                                            </h3>
                                        </GridItem>
                                    </GridContainer>
                                </React.Fragment>
                            )
                            : <div className={classes.progress}><FormattedMessage id="chart.no_data" /></div>
                        : <div className={classes.progress}><CircularProgress style={{ color: colorMod[`${color}Color`], height: '100%' }} size={50} /></div>
                    }
                </CardBody>
        <CardFooter stats>
        <div className={classes.stats}>
        <DateRange style={{visibility: 'hidden'}} />

        </div>
        <Button color="transparent" className={classes.buttonFooter} onClick={this.handleHome}>
        {isInHome ? <FavoriteIconSelected /> : <FavoriteIcon />}
        </Button>
        </CardFooter>
        </Card>
    );
    }
}

export default withStyles(boxStyle)(ModuleInfoBox);
