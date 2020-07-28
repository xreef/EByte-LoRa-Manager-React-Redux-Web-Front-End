import React, {MouseEventHandler, RefObject} from 'react';
// import PropTypes from 'prop-types';

import classNames from 'classnames';
// @material-ui/core components
import withStyles from '@material-ui/core/styles/withStyles';
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';
import Grow from '@material-ui/core/Grow';
import Paper from '@material-ui/core/Paper';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Hidden from '@material-ui/core/Hidden';
import Poppers from '@material-ui/core/Popper';
// @material-ui/icons
// import Person from '@material-ui/icons/Person';
import Notifications from '@material-ui/icons/Notifications';
// import ChatBubble from '@material-ui/icons/ChatBubble';
import Dashboard from '@material-ui/icons/Dashboard';
// import Search from '@material-ui/icons/Search';
// core components
// import CustomInput from '../customInput/CustomInput';
import Button from '../customButtons/Button';

import headerLinksStyle from './style/headerLinksStyle';
import {INotification, INotificationsState} from "../../redux/types/notifications";

interface Props {
   notifications: INotificationsState,

    classes: any
}

interface StateHL {
    open: boolean,
    openInlineNotifications: boolean
}

class HeaderLinks extends React.Component<Props, StateHL> {
    anchorEl = React.createRef<HTMLButtonElement>();
    anchorElInlineNotifications = React.createRef<HTMLButtonElement>();
    handleClick: MouseEventHandler | null = null;

    constructor(props: Props) {
        super(props);

        this.state = {
            openInlineNotifications: false,
            open: false
        };
    }


  handleToggle = () => {
    this.setState(state => ({ open: !state.open }));
  };

  handleClose = (event: any) => {
    if (this.anchorEl.current && event.target && this.anchorEl.current.contains(event.target)) {
      return;
    }

    this.setState({ open: false });
  };

    handleToggleInlineNotifications = () => {
      this.setState(state => ({ openInlineNotifications: !state.openInlineNotifications }));
    };


    handleCloseInlineNotifications = (event: any) => {
      if (this.anchorElInlineNotifications.current && this.anchorElInlineNotifications.current.contains(event.target)) {
        return;
      }

      this.setState({ openInlineNotifications: false });
    };

  getMenuItemFromNotifications = (notifications: INotification[], handleClose: any) => {
    const { classes } = this.props;

    const parseNotification = (idx: number, notification: INotification, handleClose: MouseEventHandler) => (
      <MenuItem
        key={idx}
        onClick={handleClose}
        className={classes.dropdownItem+' '+classes[notification.variant]}
      >
          {notification.title || notification.message}
      </MenuItem>
    );
    let arrMI: JSX.Element[] = [];
    notifications.forEach((notification: INotification, idx) => {
      arrMI.push(parseNotification(idx, notification, handleClose));
    });
    return arrMI;
  };

  render() {
    const { classes } = this.props;
    const { notifications } = this.props;
    const { open, openInlineNotifications } = this.state;
    return (
      <div>
        {/* SEARCH */}
        {/* <div className={classes.searchWrapper}> */}
        {/* <CustomInput */}
        {/* formControlProps={{ */}
        {/* className: `${classes.margin} ${classes.search}` */}
        {/* }} */}
        {/* inputProps={{ */}
        {/* placeholder: 'Search', */}
        {/* inputProps: { */}
        {/* 'aria-label': 'Search' */}
        {/* } */}
        {/* }} */}
        {/* /> */}
        {/* <Button color="white" aria-label="edit" justIcon round> */}
        {/* <Search /> */}
        {/* </Button> */}
        {/* </div> */}
        {/* Home */}
        <Button
          color={window.innerWidth > 959 ? 'transparent' : 'white'}
          justIcon={window.innerWidth > 959}
          simple={!(window.innerWidth > 959)}
          aria-label="Dashboard"
          className={classes.buttonLink}
          href="#"
        >
          <Dashboard className={classes.icons} />
          <Hidden mdUp implementation="css">
            <p className={classes.linkText}>Dashboard</p>
          </Hidden>
        </Button>

        {/* INLINE NOTIFICATION */}
        <div className={classes.manager}>
          <Button
            buttonRef={(node: RefObject<HTMLButtonElement>) => {
              this.anchorElInlineNotifications = node;
            }}
            color={window.innerWidth > 959 ? 'transparent' : 'white'}
            justIcon={window.innerWidth > 959}
            simple={!(window.innerWidth > 959)}
            aria-owns={open ? 'menu-list-grow' : null}
            aria-haspopup="true"
            onClick={this.handleToggleInlineNotifications}
            className={classes.buttonLink}
          >
            <Notifications className={classes.icons} />
            <span className={classes.notifications}>{notifications.queue.length}</span>
            <Hidden mdUp implementation="css">
              <p onClick={(this.handleClick)?this.handleClick: undefined} className={classes.linkText}>
                          Inline notification
              </p>
            </Hidden>
          </Button>
          <Poppers
            open={openInlineNotifications}
            anchorEl={this.anchorElInlineNotifications.current}
            transition
            disablePortal
            className={
                      `${classNames({ [classes.popperClose]: !open })
                      } ${
                        classes.pooperNav}`
                  }
          >
            {({ TransitionProps, placement }) => (
              <Grow
                {...TransitionProps}
                // id="menu-list-grow"
                style={{
                  transformOrigin:
                                  placement === 'bottom' ? 'center top' : 'center bottom'
                }}
              >
                <Paper>
                  <ClickAwayListener onClickAway={this.handleCloseInlineNotifications}>
                    <MenuList role="menu">
                      {this.getMenuItemFromNotifications(notifications.queue, this.handleCloseInlineNotifications)}
                    </MenuList>
                  </ClickAwayListener>
                </Paper>
              </Grow>
            )}
          </Poppers>
        </div>

        {/* <Button */}
        {/* color={window.innerWidth > 959 ? 'transparent' : 'white'} */}
        {/* justIcon={window.innerWidth > 959} */}
        {/* simple={!(window.innerWidth > 959)} */}
        {/* aria-label="Person" */}
        {/* className={classes.buttonLink} */}
        {/* > */}
        {/* <Person className={classes.icons} /> */}
        {/* <Hidden mdUp implementation="css"> */}
        {/* <p className={classes.linkText}>Profile</p> */}
        {/* </Hidden> */}
        {/* </Button> */}
      </div>
    );
  }
}

// HeaderLinks.propTypes = {
//   notifications: PropTypes.object.isRequired
// };

export default withStyles(headerLinksStyle)(HeaderLinks);
