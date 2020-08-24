/* eslint-disable */
import React, {createRef, RefObject} from "react";
// import PropTypes from "prop-types";
import { Switch, Route, Redirect } from "react-router-dom";
// creates a beautiful scrollbar
import PerfectScrollbar from "perfect-scrollbar";
import "perfect-scrollbar/css/perfect-scrollbar.css";
// import "/node_modules/react-grid-layout/css/styles.css";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
// core components
import Header from "../../component/header/Header";
import Footer from "../../component/footer/Footer";
import Sidebar from "../../component/sidebar/Sidebar";

import dashboardRoutes from "../../routes/dashboard";

import dashboardStyle from "./style/dashboardStyle";

import image from "../../resources/images/sidebar-solar.jpg";
import logo from "../../resources/images/favicon/favicon-96x96.png";
import Snackbar from "../../component/snackbars/Snackbar";

import {subscribeServiceWorker} from "../../utils/serviceWorker/subscribeServiceWorker"
import {checkPushNotificationSupport, checkUserSubscribedToPushNotification, subscribePush, unsubscribePush} from "../../utils/serviceWorker/subscribePush"
import {addToHomeScreen} from "../../utils/serviceWorker/homeScreen"
import {addNotification, configurationFetch, setVersion} from "../../redux/actions";
import Divider from "@material-ui/core/Divider/Divider";
import List from "@material-ui/core/List/List";
import ListItem from "@material-ui/core/ListItem/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon/ListItemIcon";
import StoreIcon from "@material-ui/icons/Store";
import ListItemText from "@material-ui/core/ListItemText/ListItemText";
import {RootState} from "../../redux/reducers";
import {versionSelectors} from "../../redux/reducers/version";
import {WrappedComponentProps} from "react-intl";
import {INotification, INotificationsState} from "../../redux/types/notifications";
import {IServerState} from "../../redux/types/serverState";
import {Function} from "@babel/types";
import {Action} from "redux";
import IconButton from "@material-ui/core/IconButton/IconButton";
// import { FormattedMessage } from 'react-intl';
// import {
//     setPushNotificationSupported,
//     setServiceWorkerSubscription,
//     setUserSubscribedToPushNotification
// } from "../../redux.actions";

const switchRoutes = (
  <Switch>
    {dashboardRoutes.map((prop, key) => {
      if (prop.redirect && prop.to)
        return <Redirect from={prop.path} to={prop.to} key={key} />;
      return <Route path={prop.path} component={prop.component} key={key} />;
    })}
  </Switch>
);

interface OwnProps {
    classes: any,
    notifications: INotificationsState,
    serverState: IServerState,

    addNotification: any,
    shiftNotification: any,

    setUserSubscribedToPushNotification: any,
    setServiceWorkerSubscription: any,
    setPushNotificationSupported: any,

    serverStateFetch: any,
    webSocketOpen: any,
    webSocketClose: any,

    location: any

}

type Props = OwnProps

interface IDashboardState {
    notificationOpen: boolean,
    mobileOpen: boolean,
    serviceWorker: any

}

class App extends React.Component<Props, IDashboardState> {
    mainPanel = React.createRef<HTMLDivElement>()

  constructor(props: Props) {
    super(props);
    this.state = {
        notificationOpen: true,
        mobileOpen: false,
        serviceWorker: {
          deferredPrompt: null
        }
    };
    // props.serverStateFetch();

    props.webSocketOpen();
    this.resizeFunction = this.resizeFunction.bind(this);
  }

  handleCloseNotification = () => {
    this.setState({
      notificationOpen: false
    });

    setTimeout(()=>{
      this.setState({
        notificationOpen: true
      });
      this.props.shiftNotification();
    }, 700);
  };

  handleDrawerToggle = () => {
    this.setState({ mobileOpen: !this.state.mobileOpen });
  };
  getRoute() {
    return this.props.location.pathname !== "/maps";
  }
  resizeFunction() {
    if (window.innerWidth >= 960) {
      this.setState({ mobileOpen: false });
    }
  }
  componentDidMount() {
    const {addNotification,
        setUserSubscribedToPushNotification,
        setServiceWorkerSubscription,
        setPushNotificationSupported} = this.props;
    if (navigator.platform.indexOf("Win") > -1) {
        if (this.mainPanel && this.mainPanel.current) {
            const ps = new PerfectScrollbar(this.mainPanel.current);
        }
    }
    window.addEventListener("resize", this.resizeFunction);
    //   let resizeTimer;
    //   window.addEventListener("resize", () => {
    //       clearTimeout(resizeTimer);
    //       resizeTimer = setTimeout(this.resizeFunction, 250);
    //   });

    let  registration = null;
    const subscribeServiceWorkerCB = (response: any) => {
        addNotification(response);
        setServiceWorkerSubscription(response.exitStatus, response.registration);

        let registration = response.registration;
        if (response.exitStatus) {
            //        chrome://flags/#enable-desktop-pwas
            window.addEventListener('beforeinstallprompt', (e) => {
                // Prevent Chrome 67 and earlier from automatically showing the prompt
                e.preventDefault();
                // Stash the event so it can be triggered later.
                this.setState({
                    serviceWorker: {
                        ...this.state.serviceWorker,
                        deferredPrompt: e
                    }
                })
            });

            const checkPushNotificationSupportCB = (response: any) => {
                addNotification(response);
                setPushNotificationSupported(response.exitStatus);

                if (response.exitStatus) {
                    const checkUserSubscribedToPushNotificationCB = (response: any) => {
                        addNotification(response);
                        setUserSubscribedToPushNotification(response.exitStatus);
                    };
                    checkUserSubscribedToPushNotification(registration, checkUserSubscribedToPushNotificationCB);
                }
            };
            checkPushNotificationSupport(checkPushNotificationSupportCB);
        }
    };
    // Remove serviceWorker
    // subscribeServiceWorker(subscribeServiceWorkerCB);

    // addNotification({ message: <FormattedHTMLMessage id="websocket.error" />, variant: 'error', autoHide: false })
    // addNotification({ message: <FormattedHTMLMessage id="websocket.error" />, variant: 'error', autoHide: false })
    // addNotification({ message: <FormattedHTMLMessage id="websocket.error" />, variant: 'error', autoHide: false })
    // addNotification({ message: <FormattedHTMLMessage id="websocket.error" />, variant: 'warning', autoHide: false })
    // addNotification({ message: <FormattedHTMLMessage id="websocket.error" />, variant: 'info', autoHide: false })
  }

  addToHomeScreen = () => {
      const {addNotification} = this.props;
      const addToHomeScreenCB = (response: any) => {
          addNotification(response);
          if (response.exitStatus===true){
            this.setState({
                serviceWorker:{
                    ...this.state.serviceWorker,
                    deferredPrompt: null
                }})
          }
      };
      addToHomeScreen(this.state.serviceWorker.deferredPrompt, addToHomeScreenCB);
  };

  componentDidUpdate(e: any) {
    if (e.history.location.pathname !== e.location.pathname) {
      if (this.mainPanel && this.mainPanel.current) this.mainPanel.current.scrollTop = 0;
      if (this.state.mobileOpen) {
        this.setState({ mobileOpen: false });
      }
    }
  }
  componentWillUnmount() {
    window.removeEventListener("resize", this.resizeFunction);
    this.props.webSocketClose();
  }

  setMainPanelRef = (mainPanel: RefObject<HTMLDivElement>) => {
    this.mainPanel = mainPanel;
  };


  render() {
    const { classes, ...rest } = this.props;
    const {notifications, serverState} = this.props;

    let ss = -100;
    // debugger
    if (serverState && serverState.data && serverState.data.network && serverState.data.network.signalStrengh){
      ss = serverState.data.network.signalStrengh;
    }
    let batteryVoltage = 0;
    if (serverState && serverState.data && serverState.data.chip && serverState.data.chip.batteryVoltage){
      batteryVoltage = serverState.data.chip.batteryVoltage;
    }

      return (
      <div className={classes.wrapper}>
        <Sidebar
            {...rest}

          routes={dashboardRoutes}
          logoText={"Ebyte Manager"}
          logo={logo}
          image={image}
          handleDrawerToggle={this.handleDrawerToggle}
          open={this.state.mobileOpen}
          color="blue"
          notifications={notifications}
          addToHomeScreen = {this.state.serviceWorker.deferredPrompt!==null?this.addToHomeScreen:null}
        />

        <div className={classes.mainPanel} ref={this.mainPanel}>
          <Header
              {...rest}

            // color="success"
            routes={dashboardRoutes}
            handleDrawerToggle={this.handleDrawerToggle}
            notifications={notifications}
            signalStrenght={ss}
            batteryVoltage={batteryVoltage}
          />

          {/* On the /maps route we want the map to be on full screen - this is not possible if the content and conatiner classes are present because they have some paddings which would make the map smaller */}
          {this.getRoute() ? (
            <div className={classes.content}>
              <div className={classes.container}>{switchRoutes}</div>
            </div>
          ) : (
            <div className={classes.map}>{switchRoutes}</div>
          )}
          {this.getRoute() ? <Footer /> : null}

            {(notifications.current!==null)?
                <Snackbar
                    message={notifications.current.message}
                    open={this.state.notificationOpen && notifications.current!==null}
                    color={notifications.current.variant}
                    autoHideDuration={(notifications.current.autoHide)?notifications.current.autoHide:undefined}
                    onClose={this.handleCloseNotification}


                    close={!(this.state.notificationOpen && notifications.current!==null)}

                    // close={true}
                    icon={IconButton}
                    place={"br"}
                />
                :
                null}

        </div>
      </div>
    );
  }
}

// App.propTypes = {
//     classes: PropTypes.object.isRequired,
//     notifications: PropTypes.object.isRequired,
//     serverState: PropTypes.object.isRequired,
//
//     addNotification: PropTypes.func.isRequired,
//     shiftNotification: PropTypes.func.isRequired,
//
//     setUserSubscribedToPushNotification: PropTypes.func.isRequired,
//     setServiceWorkerSubscription: PropTypes.func.isRequired,
//     setPushNotificationSupported: PropTypes.func.isRequired,
//
//     serverStateFetch: PropTypes.func.isRequired,
//     webSocketOpen: PropTypes.func.isRequired,
//     webSocketClose : PropTypes.func.isRequired
// };

export default withStyles(dashboardStyle)(App);
