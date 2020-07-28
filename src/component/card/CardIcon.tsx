import React from "react";
// nodejs library that concatenates classes
import classNames from "classnames";
// nodejs library to set properties for components
// import PropTypes from "prop-types";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
// @material-ui/icons

// core components
import cardIconStyle from "./style/cardIconStyle";
import {ThemeColors} from "../../layouts/GenericTypes";

interface Props {
    classes: any,
    className?: string,
    color: ThemeColors
    children: JSX.Element | JSX.Element[]
}

function CardIcon({ ...props }: Props) {
  const { classes, className, children, color, ...rest } = props;
    let cn:{[key: string]: any} = {
        [classes.cardIcon]: true,
        [classes[color + "CardHeader"]]: color,
    };
    if (className!==undefined) {
        cn[className] = className;
    }

    const cardIconClasses = classNames(cn);
  return (
    <div className={cardIconClasses} {...rest}>
      {children}
    </div>
  );
}

// CardIcon.propTypes = {
//   classes: PropTypes.object.isRequired,
//   className: PropTypes.string,
//   color: PropTypes.oneOf([
//     "warning",
//     "success",
//     "danger",
//     "info",
//     "primary",
//     "rose"
//   ])
// };

export default withStyles(cardIconStyle)(CardIcon);
