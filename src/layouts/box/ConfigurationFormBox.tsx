import React, {ReactChildren} from 'react';
// import PropTypes from 'prop-types';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';

import enummap from '../../utils/custom_function/enummap'

import {GridSpacing, withStyles} from '@material-ui/core';

import CircularProgress from '@material-ui/core/CircularProgress';
import { FormattedMessage, defineMessages, injectIntl } from 'react-intl';
import FavoriteIconSelected from '@material-ui/icons/Favorite';
import FavoriteIcon from '@material-ui/icons/FavoriteBorder';
import Divider from '@material-ui/core/Divider';

import Refresh from '@material-ui/icons/Refresh';

import Button from './../../component/customButtons/Button';
import Card from './../../component/card/Card';
import CardHeader from './../../component/card/CardHeader';
import CardBody from './../../component/card/CardBody';

import boxStyle from './style/boxStyle';
// import Table from './../../component/table/Table';

import {colorMod} from './../../component/style/material-dashboard-react';

import isEqual from 'lodash.isequal';
import SaveIcon from '@material-ui/icons/Save';
import RedoIcon from '@material-ui/icons/Redo';

// import Status from './../../component/status/Status';
import {
    AIR_DATA_RATE, FIDEX_TRANSMISSION, FORWARD_ERROR_CORRECTION_SWITCH,
    IConfiguration, IO_DRIVE_MODE,
    TRANSMISSION_POWER_100,
    UART_BPS_TYPE,
    UART_PARITY, WIRELESS_WAKE_UP_TIME
} from "../../redux/types/configuration";
import {IBox} from "./Types";
import {ThemeColors} from "../GenericTypes";
import GridContainer from "../../component/grid/GridContainer";
import GridItem from "../../component/grid/GridItem";
import CardFooter from "../../component/card/CardFooter";
import {configurationInitialState} from "../../redux/reducers/configuration";
import {frequencyFromModuleInfo, IModuleInfo, powerFromModuleInfo} from "../../redux/types/moduleInfo";
import {getADD, getFrequences} from "./utils/configuration";

interface OwnProps {
    configurationFetch: () => void,
    configurationFieldUpdated: (configuration: IConfiguration, lastUpdate: Date) => void,
    configurationAdd: (configuration: IConfiguration, lastUpdate: Date) => void,
    classes: any;
    configuration?: IConfiguration | null,
    moduleInfo?: IModuleInfo,
    lastUpdate: Date | null,
    isFetching: boolean
}

interface CFBState {
    configuration?: IConfiguration | null,
}

type Props = IBox & OwnProps;

class ConfigurationFormBox extends React.Component<Props, CFBState> {
  static defaultProps = {
      color: 'warning' as ThemeColors,
      isFetching: false,
      configuration: null,
      lastUpdate: null,

      configurationFetch: () => console.log("CONFIG FETCH"),
      configurationFieldUpdated: (configuration: IConfiguration, lastUpdate: Date) => console.log("CONFIGURATION UPDATE"),
      configurationAdd: (configuration: IConfiguration, lastUpdate: Date) => console.log("CONFIGURATION ADD")
  };
  constructor(props: Props) {
    super(props);
    props.configurationFetch();

    this.state = {
        configuration: props.configuration
    }
  }

  // static getDerivedStateFromProps(props: Props, state: CFBState) {
  //     if (props.configuration && state.configuration && props.configuration != state.configuration){
  //         return {...state, ...{configuration: props.configuration}}
  //     }
  // }
    componentWillReceiveProps(nextProps: Props) {
        // if (this.props.configuration != nextProps.configuration){
        if (!isEqual(this.props.configuration, nextProps.configuration)){
            this.setState({configuration: nextProps.configuration});
        }
    }

  refreshData = () => {
    this.props.configurationFetch();
  };

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

    handleChange = (event: any, container?: "ADDL" | "ADDH" | "CHAN" | "OPTION" | "SPED") => {

        let conf: IConfiguration;
        if (this.state.configuration) {
            conf = {...this.state.configuration};

            if (container) {
                const keyContainer  = container;

                if (keyContainer === "SPED") {
                    const keyToAdd: "airDataRate" | "uartBaudRate" | "uartParity" = event.target.name;
                    // const containerContent = conf[keyContainer]; //[keyToAdd] = event.value;
                    // containerContent[keyToAdd] = event.value;
                    conf[keyContainer][keyToAdd] = parseInt(event.target.value);

                } else  if (keyContainer === "OPTION") {
                    const keyToAdd: "fec" | "fixedTransmission" | "ioDriveMode" | "transmissionPower" | "wirelessWakeupTime" = event.target.name;
                    // const containerContent = conf[keyContainer]; //[keyToAdd] = event.value;
                    // containerContent[keyToAdd] = event.value;
                    conf[keyContainer][keyToAdd] = parseInt(event.target.value);
                }

            }else{
                const keyToAdd: "CHAN" | "ADDL" | "ADDH" = event.target.name;
                conf[keyToAdd] = parseInt(event.target.value);
            }
            this.setState({
                configuration: conf
            })
            this.props.configurationFieldUpdated(conf, new Date());
        }
    }

    postConfiguration = () => {
        const { configuration } = this.state;
        const { configurationAdd } = this.props;
        configuration && configurationAdd(configuration, new Date());
    }

    setDefaultValue = () => {
        this.setState({configuration: configurationInitialState})
    }

    gridContainer = (configuration: IConfiguration, moduleInfo?: IModuleInfo) => {

        let operatingFrequency = 410;

        if (moduleInfo && moduleInfo.frequency) {
            operatingFrequency = frequencyFromModuleInfo[moduleInfo.frequency].initial;
        }
        const { classes } = this.props;
        const mapBps:any = enummap(UART_BPS_TYPE);
        const mapParity:any = enummap(UART_PARITY);
        const mapAirDataRate: any = enummap(AIR_DATA_RATE);

        let mapTransmissionPower: any = enummap(TRANSMISSION_POWER_100);
        if (moduleInfo && moduleInfo.features) {
            mapTransmissionPower = enummap(powerFromModuleInfo[moduleInfo.features].powerData)
        }

        const mapFEC: any = enummap(FORWARD_ERROR_CORRECTION_SWITCH);
        const mapFT: any = enummap(FIDEX_TRANSMISSION);
        const mapWakeUpTime: any = enummap(WIRELESS_WAKE_UP_TIME);
        const mapIODriveMode: any = enummap(IO_DRIVE_MODE);

        return [<GridContainer key={0} spacing={1 as GridSpacing}>
            <GridItem item  xs={12} sm={4} md={3}>
                <TextField
                    name='CHAN'
                    label='CHAN'
                    select
                    value={configuration.CHAN}
                    onChange={(element) => this.handleChange(element)}
                    fullWidth={true}
                    margin='normal'
                    required
                    helperText={<FormattedMessage id="configuration.chan.label"/>}
                >
                    {getFrequences(operatingFrequency)}
                </TextField>
            </GridItem>
            <GridItem item xs={12} sm={4} md={3}>
                <TextField
                    name='ADDH'
                    label='ADDH'
                    select
                    value={configuration.ADDH}
                    onChange={(element) => this.handleChange(element)}
                    fullWidth={true}
                    margin='normal'
                    required
                    helperText={<FormattedMessage id="configuration.addh.label"/>}
                >
                    {getADD()}
                </TextField>
            </GridItem>
            <GridItem item xs={12} sm={4} md={3}>
                <TextField
                    name='ADDL'
                    label='ADDL'
                    select
                    value={configuration.ADDL}
                    onChange={(element) => this.handleChange(element)}
                    fullWidth={true}
                    margin='normal'
                    required
                    helperText={<FormattedMessage id="configuration.addl.label"/>}
                >
                    {getADD()}
                </TextField>

            </GridItem>

        </GridContainer>,
            <Divider className={classes.divider} />,

            <GridContainer  key={1} spacing={1 as GridSpacing}>
                <GridItem xs={12} sm={4} md={3}>
                    <TextField
                        name='uartBaudRate'
                        select
                        label={<FormattedMessage id="configuration.uart_baud_rate.label" />}
                        value={configuration.SPED.uartBaudRate}
                        onChange={(element) => this.handleChange(element, "SPED")}
                        fullWidth={true}
                        margin='normal'
                        helperText={<FormattedMessage id="configuration.uart_baud_rate.helper_text"/>}
                    >
                        {
                            Object.keys(mapBps).map(key => (<MenuItem key={key} value={key}><FormattedMessage id={"configuration.uart_bps_type."+mapBps[key].toLowerCase()}/></MenuItem>))
                        }
                    </TextField>
                </GridItem>

                <GridItem item xs={12} sm={4} md={3}>
                    <TextField
                        name='uartParity'
                        select
                        label={<FormattedMessage id="configuration.uart_parity.label" />}
                        value={configuration.SPED.uartParity}
                        onChange={(element) => this.handleChange(element, "SPED")}
                        fullWidth={true}
                        margin='normal'
                        helperText={<FormattedMessage id="configuration.uart_parity.helper_text" />}
                    >
                        {
                            Object.keys(mapParity).map(key => (<MenuItem key={key} value={key}>{mapParity[key].substr(8, mapParity[key].lenght)}</MenuItem>))
                        }
                    </TextField>
                </GridItem>

                <GridItem item xs={12} sm={4} md={3}>
                    <TextField
                        name='airDataRate'
                        select
                        label={<FormattedMessage id="configuration.air_data_rate.label" />}
                        value={configuration.SPED.airDataRate}
                        onChange={(element) => this.handleChange(element, "SPED")}
                        fullWidth={true}
                        margin='normal'
                        helperText={<FormattedMessage id="configuration.air_data_rate.helper_text" />}
                    >
                        {
                            Object.keys(mapAirDataRate).map(key => (<MenuItem key={key} value={key}><FormattedMessage id={"configuration.air_data_rate."+mapAirDataRate[key].toLowerCase()}/></MenuItem>))
                        }
                    </TextField>
                </GridItem>
            </GridContainer>,
            <Divider key="D" className={classes.divider} />,
            <GridContainer  key={3}  spacing={1 as GridSpacing}>
                <GridItem item xs={12} sm={4} md={3}>
                    <TextField
                        name='transmissionPower'
                        select
                        label={<FormattedMessage id="configuration.transmission_power.label" />}
                        value={configuration.OPTION.transmissionPower}
                        onChange={(element) => this.handleChange(element, "OPTION")}
                        fullWidth={true}
                        margin='normal'
                        helperText={<FormattedMessage id="configuration.transmission_power.helper_text" />}
                    >
                            {
                                Object.keys(mapTransmissionPower).map(key => (<MenuItem key={key} value={key}>{mapTransmissionPower[key].substr(6, mapTransmissionPower[key].lenght)+"dBm"}</MenuItem>))
                             }
                    </TextField>
                </GridItem>

                <GridItem item xs={12} sm={4} md={3}>
                    <TextField
                        name='fec'
                        select
                        label={<FormattedMessage id="configuration.fec.label" />}
                        value={configuration.OPTION.fec}
                        onChange={(element) => this.handleChange(element, "OPTION")}
                        fullWidth={true}
                        margin='normal'
                        helperText={<FormattedMessage id="configuration.fec.helper_text" />}
                    >
                        {
                            Object.keys(mapFEC).map(key => (<MenuItem key={key} value={key}><FormattedMessage id={"configuration.fec."+mapFEC[key].toLowerCase()}/></MenuItem>))
                        }
                    </TextField>
                </GridItem>

                <GridItem item xs={12} sm={4} md={3}>
                    <TextField
                        name='fixedTransmission'
                        select
                        label={<FormattedMessage id="configuration.fixed_transmission.label" />}
                        value={configuration.OPTION.fixedTransmission}
                        onChange={(element) => this.handleChange(element, "OPTION")}
                        fullWidth={true}
                        margin='normal'
                        helperText={<FormattedMessage id="configuration.fixed_transmission.helper_text" />}
                    >
                        {
                            Object.keys(mapFT).map(key => (<MenuItem key={key} value={key}><FormattedMessage id={"configuration.fixed_transmission."+mapFT[key].toLowerCase()}/></MenuItem>))
                        }
                    </TextField>
                </GridItem>

                <GridItem item xs={12} sm={4} md={3}>
                    <TextField
                        name='wirelessWakeupTime'
                        select
                        label={<FormattedMessage id="configuration.wireless_wakeup_time.label" />}
                        value={configuration.OPTION.wirelessWakeupTime}
                        onChange={(element) => this.handleChange(element, "OPTION")}
                        fullWidth={true}
                        margin='normal'
                        helperText={<FormattedMessage id="configuration.wireless_wakeup_time.helper_text" />}
                    >
                        {
                            Object.keys(mapWakeUpTime).map(key => (<MenuItem key={key} value={key}>{mapWakeUpTime[key].substr(8, mapWakeUpTime[key].lenght)+"ms"}</MenuItem>))
                        }
                    </TextField>
                </GridItem>

                <GridItem item xs={12} sm={4} md={3}>
                    <TextField
                        name='ioDriveMode'
                        select
                        label={<FormattedMessage id="configuration.io_drive_mode.label" />}
                        value={configuration.OPTION.ioDriveMode}
                        onChange={(element) => this.handleChange(element, "OPTION")}
                        fullWidth={true}
                        margin='normal'
                        helperText={<FormattedMessage id="configuration.io_drive_mode.helper_text" />}
                    >
                        {
                            Object.keys(mapIODriveMode).map(key => (<MenuItem key={key} value={key}><FormattedMessage id={"configuration.io_drive_mode."+mapIODriveMode[key].toLowerCase()}/></MenuItem>))
                        }
                        </TextField>
                </GridItem>
            </GridContainer>]
        ;
    }

    render() {
    const { classes, id } = this.props;
    const { isFetching, isInHome } = this.props;

    const { moduleInfo } = this.props;

    const { color } = this.props;

    const { configuration } = this.state;

    return (
      <Card id={id} key={id}>
        <CardHeader color={color} className="dragHeader">
          <h4 className={classes.cardTitleWhite}>
            <FormattedMessage
              id="configuration.preferences.title"
            />
            <Button justIcon round color={color} className={classes.buttonHeader2} onClick={this.handleHome}>
              {isInHome ? <FavoriteIconSelected /> : <FavoriteIcon />}
            </Button>
            <Button justIcon round color={color} className={classes.buttonHeader} onClick={this.refreshData}>
              <Refresh />
            </Button>
          </h4>
          <p className={classes.cardCategoryWhite}>
            <FormattedMessage
              id="configuration.preferences.subtitle"
            />
          </p>
        </CardHeader>
          <form  className={classes.formBox}>

          <CardBody className={classes.cardBody}>
          {(!isFetching)
            ? (configuration)
              ? (
                     this.gridContainer(configuration, moduleInfo)
              )
              : <div className={classes.progress}><FormattedMessage id="chart.no_data" /></div>
            : <div className={classes.progress}><CircularProgress style={{ color: colorMod[`${color}Color`], height: '100%' }} size={50} /></div>
                }
        </CardBody>
      <CardFooter className={classes.cartFooterButton}>
          <Button color={color}
                  type="button"
                  disabled={isFetching}
                  onClick={this.setDefaultValue}
                  startIcon={<RedoIcon />} >
              <FormattedMessage
                  id="configuration.button.default"
              />
          </Button>

          <Button color={color}
                  type="button"
                  disabled={isFetching}
                  onClick={this.postConfiguration}
                  startIcon={<SaveIcon />} >
              <FormattedMessage
                  id="configuration.button.save"
              />
          </Button>
      </CardFooter>

          </form>

      </Card>
    );
  }
}

export default withStyles(boxStyle)(ConfigurationFormBox);
