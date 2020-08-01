import React from 'react';
// nodejs library that concatenates classes
import classNames from 'classnames';
// nodejs library to set properties for components
// import PropTypes from 'prop-types';

// material-ui components
import withStyles from '@material-ui/core/styles/withStyles';
import Button from '@material-ui/core/Button';

import buttonStyle from './style/buttonStyle';

interface Props {
    classes: any,
    color: string, // PropTypes.oneOf(['primary','info','success','warning','danger','rose','white','transparent',]),
    size?: string,// PropTypes.oneOf(['sm', 'lg']),
    simple?: boolean,
    round?: boolean,
    disabled?: boolean,
    block?: boolean,
    link?: boolean,
    justIcon?: boolean,
    className?: string,
    // use this to pass the classes props from Material-UI
    muiClasses?: any,
    children?: any,
    href?: string,
    buttonRef?: any,
    onClick?: (evt: any) => void,
    startIcon?: React.ReactNode,
    type?: "button" | "reset" | "submit" | undefined
}

function RegularButton({ ...props }: Props) {
  const {
    classes,
    color,
    round,
    children,
    disabled,
    simple,
    size,
    block,
    link,
    justIcon,
    className,
    muiClasses,
    ...rest
  } = props;
  interface Icn {
    [key: string]: any
    };
  let cn: Icn = {
      [classes.button]: true,
      // [classes[size]]: size,
      [classes[color]]: color,
      [classes.round]: round,
      [classes.disabled]: disabled,
      [classes.simple]: simple,
      [classes.block]: block,
      [classes.link]: link,
      [classes.justIcon]: justIcon,

  };
  if (className) {
      cn[className] = className;
  }
  const btnClasses = classNames(cn);
  return (
    <Button  {...rest} classes={muiClasses} className={btnClasses}>
      {children}
    </Button>
  );
}

// RegularButton.propTypes = {
//   classes: PropTypes.object.isRequired,
//   color: PropTypes.oneOf([
//     'primary',
//     'info',
//     'success',
//     'warning',
//     'danger',
//     'rose',
//     'white',
//     'transparent',
//   ]),
//   size: PropTypes.oneOf(['sm', 'lg']),
//   simple: PropTypes.bool,
//   round: PropTypes.bool,
//   disabled: PropTypes.bool,
//   block: PropTypes.bool,
//   link: PropTypes.bool,
//   justIcon: PropTypes.bool,
//   className: PropTypes.string,
//   // use this to pass the classes props from Material-UI
//   muiClasses: PropTypes.object,
// };

export default withStyles(buttonStyle)(RegularButton);
