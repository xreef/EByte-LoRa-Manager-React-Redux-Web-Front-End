import React, {ReactChildren} from "react";
// nodejs library that concatenates classes
import classNames from "classnames";
// nodejs library to set properties for components
// import PropTypes from "prop-types";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
// @material-ui/icons

// core components
import cardBodyStyle from "./style/cardBodyStyle";

interface Props {
    classes: any,
    className?: string,
    plain?: boolean,
    profile?: boolean,
    children: React.ReactNode[] | React.ReactNode

}

function CardBody({ ...props }: Props) {
  const { classes, className, children, plain, profile, ...rest } = props;
  let cbc: {[key: string]: any} =
    {
        [classes.cardBody]: true,
        [classes.cardBodyPlain]: plain,
        [classes.cardBodyProfile]: profile,
    };
  if (className) {
      cbc[className] = className;
  }

  const cardBodyClasses = classNames(cbc);
  return (
    <div className={cardBodyClasses} {...rest}>
      {children}
    </div>
  );
}

// CardBody.propTypes = {
//   classes: PropTypes.object.isRequired,
//   className: PropTypes.string,
//   plain: PropTypes.bool,
//   profile: PropTypes.bool
// };

export default withStyles(cardBodyStyle)(CardBody);
