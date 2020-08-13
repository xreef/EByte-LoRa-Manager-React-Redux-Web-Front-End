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
import PlayArrow from '@material-ui/icons/PlayArrow';
import Stop from '@material-ui/icons/Stop';

// import Status from './../../component/status/Status';
import {IBox} from "./Types";
import {ThemeColors} from "../GenericTypes";
import GridContainer from "../../component/grid/GridContainer";
import GridItem from "../../component/grid/GridItem";
import CardFooter from "../../component/card/CardFooter";
import Radio from '@material-ui/core/Radio';
import FormControlLabel from '@material-ui/core/FormControlLabel';


interface OwnProps {
    classes: any;
    lastMessage: string,
    lastUpdate: Date | null,
    isConnected: boolean,
    singleMessage: boolean,
    webSocketOpen: (singleMessage: boolean) => void
    webSocketClose: () => void
}

interface CFBState {
    lastMessage?: string,
    singleMessage: boolean
}

type Props = IBox & OwnProps;

class ReceiveMessagesBox extends React.Component<Props, CFBState> {
  static defaultProps = {
      color: 'primary' as ThemeColors,
      isConnected: false,
      configuration: null,
      lastUpdate: null,
      lastMessage: '',

      webSocketOpen: () => console.log("WEB SOCKET FETCH"),
  };
  constructor(props: Props) {
    super(props);

    this.state = {
        lastMessage: props.lastMessage,
        singleMessage: true
    }
  }

  // static getDerivedStateFromProps(props: Props, state: CFBState) {
  //     if (props.configuration && state.configuration && props.configuration != state.configuration){
  //         return {...state, ...{configuration: props.configuration}}
  //     }
  // }
    componentWillReceiveProps(nextProps: Props) {
        // if (this.props.configuration != nextProps.configuration){
        if (!isEqual(this.props.lastMessage, nextProps.lastMessage)){
            this.setState({lastMessage: nextProps.lastMessage});
        }
        if (!isEqual(this.props.singleMessage, nextProps.singleMessage)){
            this.setState({singleMessage: nextProps.singleMessage});
        }
    }

  refreshData = () => {
    // this.props.configurationFetch();
  };

  openConnection = () => {
      this.props.webSocketOpen(this.state.singleMessage);
  };
  closeConnection = () => {
      debugger
      this.props.webSocketClose();

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

    handleChange = (event: any) => {
        if (event.target.name === "checkSingleMessage"){
            this.setState({singleMessage: event.target.value==="true" });
        }
    }

    gridContainer = () => {
        const {classes, color} = this.props;

        const {lastMessage, singleMessage} = this.state;

        return [<GridContainer key={0} spacing={1 as GridSpacing}>
            <GridItem item  xs={12} sm={12} md={12}>
                {/*<FormControlLabel*/}
                    {/*control={*/}
                        {/*<Switch*/}
                            {/*checked={singleMessage}*/}
                            {/*onChange={this.handleChange}*/}
                            {/*name="checkSingleMessage"*/}
                            {/*color="primary"*/}
                        {/*/>*/}
                    {/*}*/}

                    {/*label={<FormattedMessage id="receive.message.switch_single_message" />}*/}
                {/*/>*/}
                <FormControlLabel
                    value="false"
                    control={<Radio
                        checked={!singleMessage}
                        onChange={this.handleChange}
                        value="false"
                        name="checkSingleMessage"
                    />}
                    label="All buffer"
                    labelPlacement="end"
                />
                <FormControlLabel
                    value="true"
                    control={<Radio
                        checked={singleMessage}
                        onChange={this.handleChange}
                        value="true"
                        name="checkSingleMessage"
                    />}
                    label="Single message"
                    labelPlacement="end"
                />

            </GridItem>

        </GridContainer>,
            <Divider className={classes.divider} />,

            <GridContainer  key={1} spacing={1 as GridSpacing}>
                <GridItem item  xs={12} sm={12} md={12}>
                    <TextField
                        name='message'
                        color="primary"
                        label={<FormattedMessage id="receive.message.label"/>}
                        value={lastMessage}
                        onChange={(element) => this.handleChange(element)}
                        fullWidth={true}
                        margin='normal'
                        required
                        helperText={<FormattedMessage id="receive.message.helper_text" />}
                        rows={3}
                    >
                    </TextField>
                </GridItem>
            </GridContainer>]
        ;
    }

    render() {
    const { classes, id } = this.props;
    const { isConnected, isInHome } = this.props;

    const { color } = this.props;

    return (
      <Card id={id} key={id}>
        <CardHeader color={color} className="dragHeader">
          <h4 className={classes.cardTitleWhite}>
            <FormattedMessage
              id="receive.message.title"
            />
            <Button justIcon round color={color} className={classes.buttonHeader} onClick={this.handleHome}>
              {isInHome ? <FavoriteIconSelected /> : <FavoriteIcon />}
            </Button>
          </h4>
          <p className={classes.cardCategoryWhite}>
            <FormattedMessage
              id="receive.message.subtitle"
            />
          </p>
        </CardHeader>
          <form  className={classes.formBox}>

          <CardBody className={classes.cardBody}>
              {this.gridContainer()}
        </CardBody>
      <CardFooter className={classes.cartFooterButton}>
          <Button color={color}
                  type="button"
                  disabled={isConnected}
                  onClick={this.openConnection}
                  startIcon={<PlayArrow />} >
              <FormattedMessage
                  id="web_socket.connect.message"
              />
          </Button>

          <Button color={color}
                  type="button"
                  disabled={!isConnected}
                  onClick={this.closeConnection}
                  startIcon={<Stop />} >
              <FormattedMessage
                  id="web_socket.disconnect.message"
              />
          </Button>
      </CardFooter>

          </form>

      </Card>
    );
  }
}

export default withStyles(boxStyle)(ReceiveMessagesBox);
