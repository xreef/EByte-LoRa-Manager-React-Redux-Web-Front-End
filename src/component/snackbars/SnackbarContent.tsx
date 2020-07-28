import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
// @material-ui/core components
import withStyles from '@material-ui/core/styles/withStyles';
import Snack from '@material-ui/core/SnackbarContent';
import IconButton from '@material-ui/core/IconButton';
// @material-ui/icons
import Close from '@material-ui/icons/Close';
// core components
import snackbarContentStyle from './style/snackbarContentStyle';
import {Function} from "@babel/types";

interface Props {
    message: JSX.Element | string,
    classes: any,
    color: string, //PropTypes.oneOf(['info', 'success', 'warning', 'danger', 'primary']),
    close: boolean,
    icon: any,
    onClose: Function
}

function SnackbarContent({ ...props }:Props) {
  const {
    classes, message, color, close, icon, onClose
  } = props;
  let action: JSX.Element[] = [];
  const messageClasses = classNames({
    [classes.iconMessage]: icon !== undefined
  });
  if (close !== undefined) {
    action = [
      <IconButton
        className={classes.iconButton}
        key="close"
        aria-label="Close"
        color="inherit"
      >
        <Close className={classes.close} />
      </IconButton>
    ];
  }
  return (
    <Snack
      // onClose={onClose}
      message={(
        <div>
          {icon !== undefined ? <props.icon className={classes.icon} /> : null}
          <span className={messageClasses}>{message}</span>
        </div>
)}
      classes={{
        root: `${classes.root} ${classes[color]}`,
        message: classes.message
      }}
      action={action}
    />
  );
}

// SnackbarContent.propTypes = {
//   classes: PropTypes.object.isRequired,
//   message: PropTypes.node.isRequired,
//   color: PropTypes.oneOf(['info', 'success', 'warning', 'danger', 'primary']),
//   close: PropTypes.bool,
//   icon: PropTypes.func,
//   onClose: PropTypes.func
// };
//
export default withStyles(snackbarContentStyle)(SnackbarContent);
