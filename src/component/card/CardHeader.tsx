import React from "react";
// nodejs library that concatenates classes
import classNames from "classnames";
// nodejs library to set properties for components
// import PropTypes from "prop-types";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
// @material-ui/icons

// core components
import cardHeaderStyle from "./style/cardHeaderStyle";
import {ThemeColors} from "../../layouts/GenericTypes";

interface Props {
    classes: any,
    className?: string,
    color: ThemeColors
    children: JSX.Element | JSX.Element[]
    plain?: boolean,
    stats?: boolean,
    icon?: boolean

}

function CardHeader({ ...props }: Props) {
  const {
    classes,
    className,
    children,
    color,
    plain,
    stats,
    icon,
    ...rest
  } = props;
  let cn:{[key: string]: any} = {
      [classes.cardHeader]: true,
      [classes[color + "CardHeader"]]: color,
      [classes.cardHeaderPlain]: plain,
      [classes.cardHeaderStats]: stats,
      [classes.cardHeaderIcon]: icon
  };
  if (className!==undefined) {
      cn[className] = className;
  }
  const cardHeaderClasses = classNames(cn);
  return (
    <div className={cardHeaderClasses} {...rest}>
      {children}
    </div>
  );
}

// CardHeader.propTypes = {
//   classes: PropTypes.object.isRequired,
//   className: PropTypes.string,
//   color: PropTypes.oneOf([
//     "warning",
//     "success",
//     "danger",
//     "info",
//     "primary",
//     "rose"
//   ]),
//   plain: PropTypes.bool,
//   stats: PropTypes.bool,
//   icon: PropTypes.bool
// };

export default withStyles(cardHeaderStyle)(CardHeader);
