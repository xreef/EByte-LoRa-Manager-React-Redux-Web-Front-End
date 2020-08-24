import * as React from "react";
import GridContainer from "../../component/grid/GridContainer";
import GridItem from "../../component/grid/GridItem";
import CustomTabs, {Tab} from "../../component/customTabs/CustomTabs";

import Mail  from "@material-ui/icons/Mail";
import Inbox  from "@material-ui/icons/Inbox";
import AllInbox  from "@material-ui/icons/AllInbox";
import {GridSpacing, withStyles} from "@material-ui/core";
import boxStyle from "./style/boxStyle";
import {frequencyFromModuleInfo, IModuleInfo} from "../../redux/types/moduleInfo";
import {ThemeColors} from "../GenericTypes";
import TextField from "@material-ui/core/TextField/TextField";
import {FormattedMessage} from "react-intl";
import {IConfiguration} from "../../redux/types/configuration";
import CircularProgress from "@material-ui/core/CircularProgress/CircularProgress";
import {colorMod} from "../../component/style/material-dashboard-react";
import {configurationInitialState} from "../../redux/reducers/configuration";
// import {moduleInfoInitialState} from "../../redux/reducers/moduleInfo";
import {getADD, getFrequences} from "./utils/configuration";
import Button from "../../component/customButtons/Button";
import Send from "@material-ui/icons/Send"
import {DeviceMessagesActions, MESSAGE_SIZE} from "../../redux/types/deviceMessages";
import {addElementToHome, configurationFetch, moduleInfoFetch} from "../../redux/actions";
import {validateFields as validateFieldsTransparent} from "../../redux/logic/messageTransparentPOST";
import {validateFields as validateFieldsFixed} from "../../redux/logic/messageFixedPOST";
import {validateFields as validateFieldsBroadcast} from "../../redux/logic/messageBroadcastPOST";
import FavoriteIconSelected from '@material-ui/icons/Favorite';
import FavoriteIcon from '@material-ui/icons/FavoriteBorder';
import {ILayoutElement} from "../../redux/types/home";
import {IBox} from "./Types";


interface OwnProps {
    classes: any;
    isFetching: boolean,
    // color: ThemeColors,

    configuration?: IConfiguration,
    moduleInfo?: IModuleInfo,

    tabToShow: string[],

    configurationFetch: () => void,
    moduleInfoFetch: () => void,


    deviceMessagesSendTransparent: (deviceMessage: string, lastUpdate: Date) => void
    deviceMessagesSendBroadcast: (CHAN:number, deviceMessage: string, lastUpdate: Date) => void
    deviceMessagesSendFixed: (CHAN:number, ADDH: number, ADDL: number, deviceMessage: string, lastUpdate: Date) => void,

    deviceMessagesFieldInvalid: (errors: string[]) => void,

    // isInHome: boolean,
    // addElementToHome: (boxType: string) => void,
    // removeElementFromHome: (element: string) => void,
    // boxType: string
}

type Props = OwnProps & IBox;

interface OwnState {
    message: string,
    messageCharactersNumber: 0,
    tab?: string,

    ADDH?: number,
    ADDL?: number,
    CHAN?: number
}

class SendTabBox extends React.Component<Props,OwnState> {
    static defaultProps = {
        isFetching: false,
        // configuration: configurationInitialState,
        // moduleInfo: moduleInfoInitialState,

        tabToShow: ["transparent", "fixed", "broadcast"],

        moduleInfoFetch: () => console.log("Retrieve configuration"),
        configurationFetch: () => console.log("CONFIG FETCH"),

        deviceMessagesSendTransparent: (deviceMessage: string, lastUpdate: Date) => console.log("TRANSPARENT MESSAGE", deviceMessage, lastUpdate),
        deviceMessagesSendBroadcast: (CHAN:number, deviceMessage: string, lastUpdate: Date) => console.log("BROADCAST MESSAGE", CHAN, deviceMessage, lastUpdate),
        deviceMessagesSendFixed: (CHAN:number, ADDH: number, ADDL: number, deviceMessage: string, lastUpdate: Date) => console.log("BROADCAST MESSAGE", CHAN, ADDH, ADDL, deviceMessage, lastUpdate),
        deviceMessagesFieldInvalid: (errors: string[]) => console.log("FIELD INVALID", errors)
    }

    constructor(props: Props) {
        super(props);

        const { configuration, moduleInfo } = props;
        const {tabToShow, configurationFetch, moduleInfoFetch } = props;

        this.state = {
            message: '',
            messageCharactersNumber: 0
        }

        if (configuration) {
            this.state = {
                tab: tabToShow[0],
                message: '',
                messageCharactersNumber: 0,
                ADDH: configuration.ADDH,
                ADDL: configuration.ADDL,
                CHAN: configuration.CHAN
            }
        }

        configurationFetch();

        if (!(moduleInfo)){
            moduleInfoFetch();
        }
    }

    // static getDerivedStateFromProps(props: Props, state: OwnState){
    //     if (!(state.CHAN && state.ADDL && state.ADDH) && props.configuration){
    //         return {
    //             ...state,
    //             ADDH: props.configuration.ADDH,
    //             ADDL: props.configuration.ADDL,
    //             CHAN: props.configuration.CHAN
    //         }  as any // Pick<OwnState, keyof OwnState>
    //     }
    // }

    componentDidUpdate(prevProps: Props) {
        // Utilizzo tipico (non dimenticarti di comparare le props):
        if (this.props.configuration && this.state.tab && this.props.tabToShow.indexOf(this.state.tab)<0){
            this.setState( {tab: this.props.tabToShow[0]});
        }

        if (prevProps.configuration === undefined && this.props.configuration) {
            this.setState({
                ADDH: this.props.configuration.ADDH,
                ADDL: this.props.configuration.ADDL,
                CHAN: this.props.configuration.CHAN,
                tab: this.props.tabToShow[0]
            });
        }
    }

    handleChange = (event: any, container?: "TRANSPARENT" | "FIXED" | "BROADCAST") => {
        const keyToAdd: "message" | "ADDH" | "CHAN" | "ADDL" = event.target.name;

        if (event.target.name==="message"){
            // debugger
            this.setState({
                messageCharactersNumber: event.target.value.length
            });
            if (event.target.value.length>=MESSAGE_SIZE){
                return;
            }
        }

        this.setState({
            [keyToAdd]: event.target.value
        } as Pick<OwnState, keyof OwnState>)
    };

    handleTabChange = ( key: string ) => {
        // debugger
        this.setState({
            tab: key
        })
    };

    sendTransparentMessage = () => {
        const {message} = this.state;
        const {deviceMessagesSendTransparent, deviceMessagesFieldInvalid} = this.props;

        const errors: string[] = validateFieldsTransparent(message);
        if (errors.length>0) {
            deviceMessagesFieldInvalid(errors);
        }else {
            deviceMessagesSendTransparent(message, new Date());
        }
    };
    sendFixedMessage = () => {
        // debugger
        const {message, CHAN, ADDH, ADDL} = this.state;
        const {configuration, deviceMessagesSendFixed, deviceMessagesFieldInvalid} = this.props;

        const errors: string[] = validateFieldsFixed(CHAN, ADDH, ADDL, message, configuration);
        if (errors.length>0) {
            deviceMessagesFieldInvalid(errors);
        }else {
            if (CHAN !== undefined && ADDL !== undefined && ADDH !== undefined) deviceMessagesSendFixed(CHAN, ADDH, ADDL, message, new Date());
        }

    };

    handleHome = () => {
        // debugger
        const {
            isInHome, removeElementFromHome, addElementToHome, boxType
        } = this.props;
        if (isInHome) {
            removeElementFromHome(boxType);
        } else {
            addElementToHome(boxType);
        }
    };

    sendBroadcastMessage = () => {
        // debugger
        const {message, CHAN} = this.state;
        const {configuration, deviceMessagesSendBroadcast, deviceMessagesFieldInvalid} = this.props;

        const errors: string[] = validateFieldsBroadcast(CHAN, message, configuration);
        if (errors.length>0) {
            deviceMessagesFieldInvalid(errors);
        }else {
            if (CHAN !== undefined) deviceMessagesSendBroadcast(CHAN, message, new Date());
        }

    };

    render() {
        const {classes, color,isInHome} = this.props;

        const { configuration, moduleInfo, isFetching } = this.props;

        const { tabToShow } = this.props;

        let { message, messageCharactersNumber, ADDH, ADDL, tab } = this.state;

        let operatingFrequency = 410;

        if (moduleInfo && moduleInfo.frequency) {
            operatingFrequency = frequencyFromModuleInfo[moduleInfo.frequency].initial;
        }

        return <CustomTabs
                    title="Send:"
                    headerColor={color}

                    handleChange={this.handleTabChange}

                    selectedTab={tab}

                    headerButtons={
                        <Button justIcon round color={color} className={classes.buttonHeader} onClick={this.handleHome}>
                            {isInHome ? <FavoriteIconSelected /> : <FavoriteIcon />}
                        </Button>
                    }

                    tabs = {
                        this.getTabs(tabToShow, operatingFrequency, message, messageCharactersNumber, classes, color, isFetching, configuration)
                    }
                />

    }

    getTabs = (tabsToShow: string[], operatingFrequency: number, message: string, messageCharactersNumber:number, classes: any, color: ThemeColors, isFetching: boolean, configuration?: IConfiguration): Tab[] => {
        let tabs = [
            {
                tabKey: "transparent",
                tabName: "Transparent",
                tabIcon: Mail,
                tabContent: (
                    (!isFetching)
                        ? (configuration)
                        ? (
                            <GridContainer key={0} spacing={1 as GridSpacing}>
                                <GridItem item  xs={12} sm={6} md={6}>
                                    <TextField
                                        name='CHAN'
                                        label='CHAN'
                                        select
                                        value={configuration.CHAN}
                                        // onChange={(element) => this.handleChange(element)}
                                        fullWidth={true}
                                        margin='normal'
                                        required
                                        helperText={<FormattedMessage id="send_box.transparent.chan.helper_text"/>}
                                        variant="outlined"
                                        InputProps={{
                                            readOnly: true,
                                        }}
                                    >
                                        {getFrequences(operatingFrequency)}
                                    </TextField>
                                </GridItem>
                                <GridItem item xs={12} sm={12} md={12}>
                                    <TextField
                                        name='message'
                                        label={<FormattedMessage id="send_box.message.label"/>}
                                        value={message}
                                        onChange={(element) => this.handleChange(element, "TRANSPARENT")}
                                        fullWidth={true}
                                        margin='normal'
                                        required
                                        helperText={<FormattedMessage id="send_box.message.helper_text" values={{remainCharaters: (MESSAGE_SIZE-messageCharactersNumber)}} />}
                                        rows={3}
                                    >
                                    </TextField>
                                </GridItem>
                                <GridItem item xs={12} sm={12} md={12} style={{'textAlign': 'right'}}>
                                    <Button color={color}
                                            type="button"
                                            disabled={isFetching}
                                            onClick={this.sendTransparentMessage}

                                            endIcon={<Send />} >
                                        <FormattedMessage
                                            id="send_box.button.send.label"
                                        />
                                    </Button>
                                </GridItem>
                            </GridContainer>
                        ): <div className={classes.progress}><FormattedMessage id="widget.no_data" /></div>
                        : <div className={classes.progress}><CircularProgress style={{ color: colorMod[`${color}Color`], height: '100%' }} size={50} /></div>
                )
            },
            {
                tabKey: "fixed",
                tabName: "Fixed",
                tabIcon: Inbox,
                tabContent: (
                    (!isFetching)
                        ? (configuration)
                        ? (
                            <GridContainer key={1} spacing={1 as GridSpacing}>
                                <GridItem item  xs={12} sm={6} md={6}>
                                    <TextField
                                        name='CHAN'
                                        label='CHAN'
                                        select
                                        value={this.state.CHAN}
                                        onChange={(element) => this.handleChange(element, "FIXED")}
                                        fullWidth={true}
                                        margin='normal'
                                        required
                                        helperText={<FormattedMessage id="send_box.transparent.chan.helper_text"/>}
                                    >
                                        {getFrequences(operatingFrequency)}
                                    </TextField>
                                </GridItem>
                                <GridItem item  xs={12} sm={6} md={6}>
                                </GridItem>
                                <GridItem item xs={12} sm={6} md={6}>
                                    <TextField
                                        name='ADDH'
                                        label='ADDH'
                                        select
                                        value={this.state.ADDH}
                                        onChange={(element) => this.handleChange(element, "FIXED")}
                                        fullWidth={true}
                                        margin='normal'
                                        required

                                        helperText={<FormattedMessage id="configuration.addh.label"/>}
                                    >
                                        {getADD()}
                                    </TextField>
                                </GridItem>
                                <GridItem item xs={12} sm={6} md={6}>
                                    <TextField
                                        name='ADDL'
                                        label='ADDL'
                                        select
                                        value={this.state.ADDL}
                                        onChange={(element) => this.handleChange(element, "FIXED")}
                                        fullWidth={true}
                                        margin='normal'
                                        required
                                        helperText={<FormattedMessage id="configuration.addl.label"/>}
                                    >
                                        {getADD()}
                                    </TextField>
                                </GridItem>
                                <GridItem item xs={12} sm={12} md={12}>
                                    <TextField
                                        name='message'
                                        label={<FormattedMessage id="send_box.message.label"/>}
                                        value={message}
                                        onChange={(element) => this.handleChange(element, "FIXED")}
                                        fullWidth={true}
                                        margin='normal'
                                        required
                                        helperText={<FormattedMessage id="send_box.message.helper_text" values={{remainCharaters: (MESSAGE_SIZE-messageCharactersNumber)}} />}
                                        rows={3}

                                    >
                                    </TextField>
                                </GridItem>
                                <GridItem item xs={12} sm={12} md={12} style={{'textAlign': 'right'}}>
                                    <Button color={color}
                                            type="button"
                                            disabled={isFetching}
                                            onClick={this.sendFixedMessage}

                                            endIcon={<Send />} >
                                        <FormattedMessage
                                            id="send_box.button.send.label"
                                        />
                                    </Button>
                                </GridItem>
                            </GridContainer>
                        ): <div className={classes.progress}><FormattedMessage id="widget.no_data" /></div>
                        : <div className={classes.progress}><CircularProgress style={{ color: colorMod[`${color}Color`], height: '100%' }} size={50} /></div>
                )
            },
            {
                tabKey: "broadcast",
                tabName: "Broadcast",
                tabIcon: AllInbox,
                tabContent:
                    (
                        (!isFetching)
                            ? (configuration)
                            ? (
                                <GridContainer key={1} spacing={1 as GridSpacing}>
                                    <GridItem item  xs={12} sm={6} md={6}>
                                        <TextField
                                            name='CHAN'
                                            label='CHAN'
                                            select
                                            value={this.state.CHAN}
                                            onChange={(element) => this.handleChange(element, "BROADCAST")}
                                            fullWidth={true}
                                            margin='normal'
                                            required
                                            helperText={<FormattedMessage id="send_box.transparent.chan.helper_text"/>}
                                        >
                                            {getFrequences(operatingFrequency)}
                                        </TextField>
                                    </GridItem>
                                    <GridItem item xs={12} sm={12} md={12}>
                                        <TextField
                                            name='message'
                                            label={<FormattedMessage id="send_box.message.label"/>}
                                            value={message}
                                            onChange={(element) => this.handleChange(element, "BROADCAST")}
                                            fullWidth={true}
                                            margin='normal'
                                            required
                                            helperText={<FormattedMessage id="send_box.message.helper_text" values={{remainCharaters: (MESSAGE_SIZE-messageCharactersNumber)}} />}
                                            rows={3}

                                        >
                                        </TextField>
                                    </GridItem>
                                    <GridItem item xs={12} sm={12} md={12} style={{'textAlign': 'right'}}>
                                        <Button color={color}
                                                type="button"
                                                disabled={isFetching}
                                                onClick={this.sendBroadcastMessage}

                                                endIcon={<Send />} >
                                            <FormattedMessage
                                                id="send_box.button.send.label"
                                            />
                                        </Button>
                                    </GridItem>
                                </GridContainer>
                            ): <div className={classes.progress}><FormattedMessage id="widget.no_data" /></div>
                            : <div className={classes.progress}><CircularProgress style={{ color: colorMod[`${color}Color`], height: '100%' }} size={50} /></div>
                    )
            }
        ];

        return tabs.filter(elem => tabsToShow.indexOf(elem.tabKey) > -1)
    }
}

export default withStyles(boxStyle)(SendTabBox);
