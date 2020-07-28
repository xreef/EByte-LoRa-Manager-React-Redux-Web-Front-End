import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Button from '@material-ui/core/Button';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import ErrorIcon from '@material-ui/icons/Error';
import InfoIcon from '@material-ui/icons/Info';
import CloseIcon from '@material-ui/icons/Close';
import green from '@material-ui/core/colors/green';
import amber from '@material-ui/core/colors/amber';
import IconButton from '@material-ui/core/IconButton';
import Snackbar from '@material-ui/core/Snackbar';
import SnackbarContent from '@material-ui/core/SnackbarContent';
import WarningIcon from '@material-ui/icons/Warning';
import {createStyles, Theme, withStyles} from '@material-ui/core/styles';
import {OverridableComponent} from "@material-ui/core/OverridableComponent";
import {SvgIconTypeMap} from "@material-ui/core";

interface IVarianIcon {
    [key: string]: OverridableComponent<SvgIconTypeMap<{}, "svg">>
}

const variantIcon: IVarianIcon = {
  'success': CheckCircleIcon,
  'warning': WarningIcon,
  'error': ErrorIcon,
  'info': InfoIcon,
};

const styles1 = (theme: Theme) => createStyles({
  success: {
    backgroundColor: green[600],
  },
  error: {
    backgroundColor: theme.palette.error.dark,
  },
  info: {
    backgroundColor: theme.palette.primary.dark,
  },
  warning: {
    backgroundColor: amber[700],
  },
  icon: {
    fontSize: 20,
  },
  iconVariant: {
    opacity: 0.9,
    marginRight: theme.spacing(),
  },
  message: {
    display: 'flex',
    alignItems: 'center',
  },
});

interface Props {
    classes: any,
    className: string,
    message: JSX.Element,
    onClose: any,
    variant: string // PropTypes.oneOf(['success', 'warning', 'error', 'info']).isRequired,
}

function CustomizedSnackbarFunct(props: Props) {
  const {
    classes, className, message, onClose, variant, ...other
  } = props;
  const Icon = variantIcon[variant];

  return (
    <SnackbarContent
      className={classNames(classes[variant], className)}
      aria-describedby="client-snackbar"
      message={(
        <span id="client-snackbar" className={classes.message}>
          <Icon className={classNames(classes.icon, classes.iconVariant)} />
          {message}
        </span>
)}
      action={[
        <IconButton
          key="close"
          aria-label="Close"
          color="inherit"
          className={classes.close}
          onClick={onClose}
        >
          <CloseIcon className={classes.icon} />
        </IconButton>,
      ]}
      {...other}
    />
  );
}

// CustomizedSnackbarFunct.propTypes = {
//   classes: PropTypes.object.isRequired,
//   className: PropTypes.string,
//   message: PropTypes.node,
//   onClose: PropTypes.func,
//   variant: PropTypes.oneOf(['success', 'warning', 'error', 'info']).isRequired,
// };
//
// CustomizedSnackbarFunct.defaultProps = {
//   // classes: classes.margin
// };

export const CustomizedSnackbar = withStyles(styles1)(CustomizedSnackbarFunct);

