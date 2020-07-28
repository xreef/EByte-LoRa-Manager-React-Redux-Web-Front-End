import React from 'react';
// import PropTypes from 'prop-types';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';

import enummap from '../../utils/custom_function/enummap'

import { withStyles } from '@material-ui/core';

import CircularProgress from '@material-ui/core/CircularProgress';
import { FormattedMessage, defineMessages, injectIntl } from 'react-intl';
import FavoriteIconSelected from '@material-ui/icons/Favorite';
import FavoriteIcon from '@material-ui/icons/FavoriteBorder';

import Refresh from '@material-ui/icons/Refresh';

import Button from './../../component/customButtons/Button';
import Card from './../../component/card/Card';
import CardHeader from './../../component/card/CardHeader';
import CardBody from './../../component/card/CardBody';

import boxStyle from './style/boxStyle';
// import Table from './../../component/table/Table';

import {colorMod} from './../../component/style/material-dashboard-react';

// import Status from './../../component/status/Status';
import {AIR_DATA_RATE, IConfiguration, UART_BPS_TYPE, UART_PARITY} from "../../redux/types/configuration";
import {IBox} from "./Types";
import {ThemeColors} from "../GenericTypes";
import GridContainer from "../../component/grid/GridContainer";
import GridItem from "../../component/grid/GridItem";

interface OwnProps {
    configurationFetch: () => void,
    classes: any;
    configuration?: IConfiguration | null,
    lastUpdate: Date | null,
    isFetching: boolean
}

type Props = IBox & OwnProps;

class ConfigurationFormBox extends React.Component<Props> {
  static defaultProps = {
      color: 'warning' as ThemeColors,
      isFetching: false,
      configuration: null,
      lastUpdate: null,

      configurationFetch: () => console.log("CONFIG FETCH")
  };
  constructor(props: Props) {
    super(props);
    props.configurationFetch();
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

    handleChange = (container: string, event: any) => {
        // const target = event.target;
        // if (!this.props.moduleParams) {
        //     return;
        // }
        //
        // const newParams: IModuleParams = {
        //     ...this.props.moduleParams,
        //     [target.name]: target.value
        // };
        //
        // newParams.newBytes = EbyteClass.generateNewParams(newParams);
        //
        // this.props.onParamsChanged(newParams);
    }

    gridContainer = (configuration: IConfiguration) => {
        const mapBps:any = enummap(UART_BPS_TYPE);
        const mapParity:any = enummap(UART_PARITY);
        const mapAirDataRate: any = enummap(AIR_DATA_RATE);



        return <GridContainer>
                <GridItem xs={4} sm={4}>
                    <TextField
                        name='baudRate'
                        select
                        label='Baud Rate'
                        value={configuration.SPED.uartBaudRate}
                        onChange={(element) => this.handleChange("SPED", element)}
                        fullWidth={true}
                        margin='normal'
                        helperText='Uart BaudRate'
                    >
                        {
                            Object.keys(mapBps).map(key => (<MenuItem value={key}><FormattedMessage id={"configuration.uart_bps_type."+mapBps[key].toLowerCase()}/></MenuItem>))
                        }
                    </TextField>
                </GridItem>

                <GridItem item xs={4} sm={4}>
                    <TextField
                        name='parityBit'
                        select
                        label='Parity Bit'
                        value={configuration.SPED.uartParity}
                        onChange={(element) => this.handleChange("SPED", element)}
                        fullWidth={true}
                        margin='normal'
                        helperText='Note Parity'
                    >
                        {
                            Object.keys(mapParity).map(key => (<MenuItem value={key}>{mapParity[key].substr(8, mapParity[key].lenght)}</MenuItem>))
                        }
                    </TextField>
                </GridItem>

                <GridItem item xs={4} sm={4}>
                    <TextField
                        name='airDataRate'
                        select
                        label='Air Data Rate'
                        value={configuration.SPED.airDataRate}
                        onChange={(element) => this.handleChange("SPED", element)}
                        fullWidth={true}
                        margin='normal'
                        helperText='Data rate in the air'
                    >
                        {
                            Object.keys(mapAirDataRate).map(key => (<MenuItem value={key}><FormattedMessage id={"configuration.air_data_rate."+mapAirDataRate[key].toLowerCase()}/></MenuItem>))
                        }
                    </TextField>
                </GridItem>
            {/*</GridContainer>*/}
            {/*<GridContainer>*/}
                {/*<GridItem item xs={4} sm={4}>*/}
                    {/*<TextField*/}
                        {/*name='transmissionPower'*/}
                        {/*select*/}
                        {/*label='Transmission Power'*/}
                        {/*value={moduleParams ? moduleParams.transmissionPower : ''}*/}
                        {/*onChange={this.handleChange}*/}
                        {/*fullWidth={true}*/}
                        {/*margin='normal'*/}
                        {/*helperText='RF output power'*/}
                    {/*>*/}
                        {/*<MenuItem value={0}>20dBm</MenuItem>*/}
                        {/*<MenuItem value={1}>17dBm</MenuItem>*/}
                        {/*<MenuItem value={2}>14dBm</MenuItem>*/}
                        {/*<MenuItem value={3}>10dBm</MenuItem>*/}
                    {/*</TextField>*/}
                {/*</GridItem>*/}

                {/*<GridItem item xs={4} sm={4}>*/}
                    {/*<TextField*/}
                        {/*name='fecSwitch'*/}
                        {/*select*/}
                        {/*label='FEC'*/}
                        {/*value={moduleParams ? moduleParams.fecSwitch : ''}*/}
                        {/*onChange={this.handleChange}*/}
                        {/*fullWidth={true}*/}
                        {/*margin='normal'*/}
                        {/*helperText='Forward error correction'*/}
                    {/*>*/}
                        {/*<MenuItem value={0}>Disable</MenuItem>*/}
                        {/*<MenuItem value={1}>Enable</MenuItem>*/}
                    {/*</TextField>*/}
                {/*</GridItem>*/}

                {/*<GridItem item xs={4} sm={4}>*/}
                    {/*<TextField*/}
                        {/*name='txMode'*/}
                        {/*select*/}
                        {/*label='Fixed Mode'*/}
                        {/*value={moduleParams ? moduleParams.txMode : ''}*/}
                        {/*onChange={this.handleChange}*/}
                        {/*fullWidth={true}*/}
                        {/*margin='normal'*/}
                        {/*helperText='Open fixed mode or not '*/}
                    {/*>*/}
                        {/*<MenuItem value={0}>Transparent</MenuItem>*/}
                        {/*<MenuItem value={1}>Fixed</MenuItem>*/}
                    {/*</TextField>*/}
                {/*</GridItem>*/}

                {/*<GridItem item xs={4} sm={4}>*/}
                    {/*<TextField*/}
                        {/*name='wirelessWakeUp'*/}
                        {/*select*/}
                        {/*label='Wireless WakeUp'*/}
                        {/*value={moduleParams ? moduleParams.wirelessWakeUp : ''}*/}
                        {/*onChange={this.handleChange}*/}
                        {/*fullWidth={true}*/}
                        {/*margin='normal'*/}
                        {/*helperText='Work on radio timing'*/}
                    {/*>*/}
                        {/*<MenuItem value={0}>250ms</MenuItem>*/}
                        {/*<MenuItem value={1}>500ms</MenuItem>*/}
                        {/*<MenuItem value={2}>750ms</MenuItem>*/}
                        {/*<MenuItem value={3}>1000ms</MenuItem>*/}
                        {/*<MenuItem value={4}>1250ms</MenuItem>*/}
                        {/*<MenuItem value={5}>1500ms</MenuItem>*/}
                        {/*<MenuItem value={6}>1750ms</MenuItem>*/}
                        {/*<MenuItem value={7}>2000ms</MenuItem>*/}
                    {/*</TextField>*/}
                {/*</GridItem>*/}

                {/*<GridItem item xs={4} sm={4}>*/}
                    {/*<TextField*/}
                        {/*name='ioMode'*/}
                        {/*select*/}
                        {/*label='IO Mode'*/}
                        {/*value={moduleParams ? moduleParams.ioMode : ''}*/}
                        {/*onChange={this.handleChange}*/}
                        {/*fullWidth={true}*/}
                        {/*margin='normal'*/}
                        {/*helperText='PushPull, PullUp'*/}
                    {/*>*/}
                        {/*<MenuItem value={0}>Open</MenuItem>*/}
                        {/*<MenuItem value={1}>PushPull</MenuItem>*/}
                    {/*</TextField>*/}
                {/*</GridItem>*/}

                {/*<GridItem item xs={4} sm={4}>*/}
                    {/*<TextField*/}
                        {/*name='address'*/}
                        {/*label='Address'*/}
                        {/*value={moduleParams ? moduleParams.address : ''}*/}
                        {/*onChange={this.handleChange}*/}
                        {/*fullWidth={true}*/}
                        {/*margin='normal'*/}
                        {/*helperText='Number from 1 to 65535'*/}
                    {/*/>*/}
                {/*</GridItem>*/}

                {/*<GridItem item xs={4} sm={4}>*/}
                    {/*<TextField*/}
                        {/*name='channel'*/}
                        {/*label='Channel'*/}
                        {/*value={moduleParams ? moduleParams.channel : ''}*/}
                        {/*onChange={this.handleChange}*/}
                        {/*fullWidth={true}*/}
                        {/*margin='normal'*/}
                        {/*helperText='Frequency from 410 to 441'*/}
                    {/*/>*/}
                {/*</GridItem>*/}

            </GridContainer>
        ;
    }

    render() {
    const { classes, id } = this.props;
    const { configuration, isFetching, isInHome } = this.props;
    const { color } = this.props;

    const messagesIntl = defineMessages(
      {
        alarmState: { id: 'table.inverter.alarm.state' },
        channel1State: { id: 'table.inverter.channel1.state' },
        channel2State: { id: 'table.inverter.channel2.state' },
        inverterState: { id: 'table.inverter.inverter.state' }
      }
    );


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
        <CardBody>
          {(!isFetching)
            ? (configuration)
              ? (
                    this.gridContainer(configuration)
              )
              : <div className={classes.progress}><FormattedMessage id="chart.no_data" /></div>
            : <div className={classes.progress}><CircularProgress style={{ color: colorMod[`${color}Color`] }} size={50} /></div>
                }

        </CardBody>
      </Card>
    );
  }
}

// ConfigurationFormBox.propTypes = {
//   classes: PropTypes.object.isRequired,
//   data: PropTypes.object,
//   id: PropTypes.string.isRequired,
//   color: PropTypes.oneOf([
//     'warning',
//     'success',
//     'danger',
//     'info',
//     'primary',
//     'rose'
//   ]),
//   isFetching: PropTypes.bool,
//   inverterAlarmsFetch: PropTypes.func.isRequired,
//   addElementToHome: PropTypes.func.isRequired,
//   removeElementFromHome: PropTypes.func.isRequired,
//   boxType: PropTypes.string.isRequired,
//   isInHome: PropTypes.bool.isRequired
//
// };
// ConfigurationFormBox.defaultProps = {
//   color: 'warning',
//   isFetching: false,
//   data: null
// };

export default withStyles(boxStyle)(ConfigurationFormBox);
