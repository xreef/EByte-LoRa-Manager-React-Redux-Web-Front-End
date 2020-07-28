import {
  defaultFont,
  container,
  primaryColor
} from "../../../component/style/material-dashboard-react";
import {createStyles, Theme} from "@material-ui/core";

const footerStyle =(theme: Theme) => createStyles( {
  block: {
    color: "inherit",
    padding: "5px",
    textTransform: "uppercase",
    borderRadius: "3px",
    textDecoration: "none",
    position: "relative",
    display: "block",
    ...defaultFont,
    fontWeight: 500,
    fontSize: "12px"
  },
  left: {
    float: "left!important" as "left",
    display: "block"
  },
  right: {
    // padding: "5px 0",
    margin: "0",
    fontSize: "14px",
    float: "right!important"  as "right"
  },
  footer: {
    bottom: "0",
    borderTop: "1px solid #e7e7e7",
    padding: "5px 0",
    ...defaultFont
  },
  container,
  a: {
    color: primaryColor,
    textDecoration: "none",
    backgroundColor: "transparent"
  },
  list: {
    marginBottom: "0",
    padding: "0",
    marginTop: "0"
  },
  inlineBlock: {
    display: "inline-block",
    padding: "0px",
    width: "auto"
  }
});
export default footerStyle;
